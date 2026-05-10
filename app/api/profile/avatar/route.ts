import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('avatar') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No image provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || '.jpg';
    const filename = `avatar-${session.userId}-${Date.now()}${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'assets', 'avatars');
    await mkdir(uploadDir, { recursive: true });

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const avatarUrl = `/assets/avatars/${filename}`;

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: { person: true },
    });

    if (user?.person) {
      await prisma.person.update({
        where: { id: user.person.id },
        data: { avatar: avatarUrl },
      });
    }

    return NextResponse.json({ data: { url: avatarUrl } }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
