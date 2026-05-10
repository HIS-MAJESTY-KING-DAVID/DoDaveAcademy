import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';
import { z } from 'zod';

const updateCourseSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  description: z.string().min(10).max(2000).optional(),
  content: z.string().optional(),
  categoryId: z.number().optional(),
  skillLevelId: z.number().optional(),
  isFree: z.boolean().optional(),
  difficultyLevel: z.string().optional(),
  language: z.string().optional(),
  tags: z.string().optional(),
  subscriptionPrice: z.number().optional(),
});

async function verifyOwnership(courseId: number, userId: number) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: { instructor: true },
  });
  if (!course) return { course: null, error: 'Course not found', status: 404 };
  if (course.instructor?.userId !== userId) return { course: null, error: 'Forbidden', status: 403 };
  return { course, error: null, status: 200 };
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const courseId = parseInt(id);
    if (isNaN(courseId)) {
      return NextResponse.json({ message: 'Invalid course ID' }, { status: 400 });
    }

    const { course, error, status } = await verifyOwnership(courseId, session.userId);
    if (error) return NextResponse.json({ message: error }, { status });

    const full = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        category: true,
        skillLevel: true,
        media: true,
        chapters: {
          include: {
            lessons: true,
            quizzes: { include: { propositions: true } },
          },
          orderBy: { number: 'asc' },
        },
        faqs: true,
      },
    });

    return NextResponse.json({ data: full });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const courseId = parseInt(id);
    if (isNaN(courseId)) {
      return NextResponse.json({ message: 'Invalid course ID' }, { status: 400 });
    }

    const { course, error, status } = await verifyOwnership(courseId, session.userId);
    if (error) return NextResponse.json({ message: error }, { status });

    const body = await req.json();
    const data = updateCourseSchema.parse(body);

    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) {
      updateData.title = data.title;
      updateData.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + '-' + course!.id;
    }
    if (data.description !== undefined) updateData.description = data.description;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
    if (data.skillLevelId !== undefined) updateData.skillLevelId = data.skillLevelId;
    if (data.isFree !== undefined) updateData.isFree = data.isFree;
    if (data.difficultyLevel !== undefined) updateData.difficultyLevel = data.difficultyLevel;
    if (data.language !== undefined) updateData.language = data.language;
    if (data.tags !== undefined) updateData.tags = data.tags;
    if (data.subscriptionPrice !== undefined) updateData.subscriptionPrice = data.subscriptionPrice;
    updateData.updatedAt = new Date();

    const updated = await prisma.course.update({
      where: { id: courseId },
      data: updateData as Record<string, unknown>,
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const courseId = parseInt(id);
    if (isNaN(courseId)) {
      return NextResponse.json({ message: 'Invalid course ID' }, { status: 400 });
    }

    const { course, error, status } = await verifyOwnership(courseId, session.userId);
    if (error) return NextResponse.json({ message: error }, { status });

    await prisma.course.delete({ where: { id: courseId } });

    return NextResponse.json({ message: 'Course deleted' });
  } catch (error) {
    return handleApiError(error);
  }
}
