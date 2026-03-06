import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

function isPrivilegedRole(roles: string) {
  return roles.includes('ROLE_ADMIN') || roles.includes('ROLE_INSTRUCTOR');
}

function normalizeFileName(raw: string) {
  return path.basename(raw);
}

async function resolveExistingFilePath(fileName: string) {
  const projectRoot = process.cwd();
  const candidates = [
    process.env.EXAMS_FILES_DIR,
    path.join(projectRoot, 'uploads', 'media', 'exams', 'files'),
    path.join(projectRoot, 'public', 'uploads', 'media', 'exams', 'files'),
    path.join(projectRoot, 'uploads', 'exams', 'files'),
  ].filter((candidate): candidate is string => Boolean(candidate));

  for (const directory of candidates) {
    const absolutePath = path.join(directory, fileName);
    try {
      await fs.access(absolutePath);
      return absolutePath;
    } catch {
      continue;
    }
  }

  return null;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { filename } = await params;
  const decoded = decodeURIComponent(filename);
  const requestedFileName = normalizeFileName(decoded);

  if (!requestedFileName || requestedFileName.includes('..')) {
    return NextResponse.json({ message: 'Invalid filename' }, { status: 400 });
  }

  const exam = await prisma.exam.findFirst({
    where: {
      isPublished: true,
      OR: [
        { subject: { endsWith: requestedFileName } },
        { correction: { endsWith: requestedFileName } },
      ],
    },
    select: {
      id: true,
      userId: true,
      subject: true,
      correction: true,
    },
  });

  if (!exam) {
    return NextResponse.json({ message: 'File is not linked to any published exam' }, { status: 404 });
  }

  let hasAccess = isPrivilegedRole(session.roles) || exam.userId === session.userId;

  if (!hasAccess) {
    const student = await prisma.student.findUnique({
      where: { userId: session.userId },
      select: { isPremium: true },
    });
    hasAccess = student?.isPremium === true;
  }

  if (!hasAccess) {
    return NextResponse.json({ message: 'Premium access required' }, { status: 403 });
  }

  const allowedFileNames = [exam.subject, exam.correction]
    .filter((value): value is string => Boolean(value))
    .map((value) => normalizeFileName(value));
  if (!allowedFileNames.includes(requestedFileName)) {
    return NextResponse.json({ message: 'Unauthorized file access' }, { status: 403 });
  }

  const absoluteFilePath = await resolveExistingFilePath(requestedFileName);
  if (!absoluteFilePath) {
    return NextResponse.json({ message: 'File not found on server' }, { status: 404 });
  }

  const fileBuffer = await fs.readFile(absoluteFilePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${requestedFileName}"`,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'private, max-age=300',
    },
  });
}
