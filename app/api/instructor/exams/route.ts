import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

async function requireCertifiedInstructor() {
  const session = await getSession();
  if (!session) return { session: null, instructor: null };
  const instructor = await prisma.instructor.findUnique({ where: { userId: session.userId } });
  return { session, instructor };
}

function reference() {
  return `EX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function normalizeExam(body: Record<string, unknown>) {
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const description = typeof body.description === 'string' ? body.description.trim() : '';
  const duration = typeof body.duration === 'string' || typeof body.duration === 'number' ? String(body.duration).trim() : '';
  const language = typeof body.language === 'string' && body.language.trim() ? body.language.trim() : 'fr';
  if (!title || !subject || !description || !duration) return null;
  const categoryId = body.categoryId ? Number(body.categoryId) : null;
  const classId = body.classId ? Number(body.classId) : null;
  return { title, subject, description, duration, language, categoryId: Number.isInteger(categoryId) ? categoryId : null, classId: Number.isInteger(classId) ? classId : null, correction: typeof body.correction === 'string' ? body.correction : null, imageFile: typeof body.imageFile === 'string' ? body.imageFile : null };
}

export async function GET() {
  try {
    const { session, instructor } = await requireCertifiedInstructor();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (!instructor) return NextResponse.json({ message: 'Instructor profile not found' }, { status: 403 });
    const exams = await prisma.exam.findMany({ where: { userId: session.userId }, include: { category: true, class: true }, orderBy: { publishedAt: 'desc' } });
    return NextResponse.json({ exams });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { session, instructor } = await requireCertifiedInstructor();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (!instructor) return NextResponse.json({ message: 'Instructor profile not found' }, { status: 403 });
    if (!instructor.isCertified) return NextResponse.json({ message: 'Only certified instructors can create exams' }, { status: 403 });
    const data = normalizeExam(await req.json());
    if (!data) return NextResponse.json({ message: 'Title, subject, description, and duration are required' }, { status: 400 });
    const exam = await prisma.exam.create({ data: { ...data, userId: session.userId, reference: reference(), publishedAt: new Date(), isPublished: false, isValidated: false }, include: { category: true, class: true } });
    return NextResponse.json({ exam }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
