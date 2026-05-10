import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

export async function POST(req: Request) {
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

    const { chapterId, courseId, title, content, videoLink, poster, number } = await req.json();

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course || course.instructorId !== instructor.id) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();

    const lesson = await prisma.lesson.create({
      data: {
        chapterId,
        title,
        slug,
        content: content || '',
        videoLink: videoLink || null,
        poster: poster || null,
        number: number || 1,
      },
    });

    await prisma.course.update({
      where: { id: courseId },
      data: { numberOfLessons: { increment: 1 }, updatedAt: new Date() },
    });

    return NextResponse.json({ data: lesson }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
