import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'evaluation';
}

async function requireInstructor() {
  const session = await getSession();
  if (!session) return { session: null, instructor: null };

  const instructor = await prisma.instructor.findUnique({
    where: { userId: session.userId },
  });
  return { session, instructor };
}

export async function GET() {
  try {
    const { session, instructor } = await requireInstructor();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (!instructor) return NextResponse.json({ message: 'Instructor profile not found' }, { status: 403 });

    const evaluations = await prisma.evaluation.findMany({
      where: { instructorId: instructor.id },
      include: {
        category: true,
        _count: { select: { evaluationQuestions: true, evaluationResults: true, evaluationStudents: true } },
      },
      orderBy: { id: 'desc' },
    });

    return NextResponse.json({ evaluations });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { session, instructor } = await requireInstructor();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (!instructor) return NextResponse.json({ message: 'Instructor profile not found' }, { status: 403 });

    const body = await req.json();
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const description = typeof body.description === 'string' ? body.description.trim() : '';
    const categoryId = Number(body.categoryId);
    const duration = Number(body.duration);

    if (!title || !description || !Number.isInteger(categoryId) || !Number.isInteger(duration) || duration <= 0) {
      return NextResponse.json({ message: 'Title, description, category, and a positive duration are required' }, { status: 400 });
    }

    const category = await prisma.category.findUnique({ where: { id: categoryId }, select: { id: true } });
    if (!category) return NextResponse.json({ message: 'Category not found' }, { status: 404 });

    const startAt = body.startAt ? new Date(body.startAt) : null;
    const endAt = body.endAt ? new Date(body.endAt) : null;
    if ((startAt && Number.isNaN(startAt.getTime())) || (endAt && Number.isNaN(endAt.getTime()))) {
      return NextResponse.json({ message: 'Invalid evaluation dates' }, { status: 400 });
    }

    const baseSlug = slugify(title);
    const slug = `${baseSlug}-${Date.now().toString(36)}`;
    const classIds = Array.isArray(body.classIds) ? body.classIds.map(Number).filter(Number.isInteger) : [];
    const studentIds = Array.isArray(body.studentIds) ? body.studentIds.map(Number).filter(Number.isInteger) : [];

    const classStudents = classIds.length
      ? await prisma.student.findMany({ where: { classId: { in: classIds } }, select: { id: true } })
      : [];
    const assignedStudentIds = [...new Set([...studentIds, ...classStudents.map((student) => student.id)])];

    const evaluation = await prisma.evaluation.create({
      data: {
        categoryId,
        title,
        description,
        duration,
        startAt,
        endAt,
        slug,
        instructorId: instructor.id,
        isPassed: false,
        isGeneratedRandomQuestions: Boolean(body.isGeneratedRandomQuestions),
        isPublished: Boolean(body.isPublished),
        evaluationClasses: classIds.length ? { create: classIds.map((classId: number) => ({ classId })) } : undefined,
        evaluationStudents: assignedStudentIds.length ? { create: assignedStudentIds.map((studentId: number) => ({ studentId })) } : undefined,
      },
      include: { category: true, evaluationClasses: true, evaluationStudents: true },
    });

    return NextResponse.json({ evaluation }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
