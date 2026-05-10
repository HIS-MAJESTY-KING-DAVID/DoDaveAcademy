import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const instructor = await prisma.instructor.findUnique({
      where: { userId: session.userId },
    });
    if (!instructor) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const lessonId = parseInt(id);
    if (isNaN(lessonId)) {
      return NextResponse.json({ message: 'Invalid lesson ID' }, { status: 400 });
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { chapter: { include: { course: true } } },
    });

    if (!lesson || lesson.chapter?.course?.instructorId !== instructor.id) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { title, content, videoLink, poster } = await req.json();

    const updated = await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        ...(title !== undefined && { title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + lessonId }),
        ...(content !== undefined && { content }),
        ...(videoLink !== undefined && { videoLink }),
        ...(poster !== undefined && { poster }),
        updatedAt: new Date(),
      },
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

    const instructor = await prisma.instructor.findUnique({
      where: { userId: session.userId },
    });
    if (!instructor) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const lessonId = parseInt(id);
    if (isNaN(lessonId)) {
      return NextResponse.json({ message: 'Invalid lesson ID' }, { status: 400 });
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { chapter: { include: { course: true } } },
    });

    if (!lesson || lesson.chapter?.course?.instructorId !== instructor.id) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await prisma.lesson.delete({ where: { id: lessonId } });

    await prisma.course.update({
      where: { id: lesson.chapter.course.id },
      data: { numberOfLessons: { decrement: 1 }, updatedAt: new Date() },
    });

    return NextResponse.json({ message: 'Lesson deleted' });
  } catch (error) {
    return handleApiError(error);
  }
}
