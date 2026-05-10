import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';
import { notifyCoursePublished } from '@/lib/notifications';

export async function POST(
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

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { instructor: true },
    });

    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    if (course.instructor?.userId !== session.userId) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { action } = await req.json();

    if (action === 'publish') {
      const chapterCount = await prisma.chapter.count({ where: { courseId } });
      if (chapterCount === 0) {
        return NextResponse.json(
          { message: 'Course must have at least one chapter before publishing' },
          { status: 400 }
        );
      }

      const updated = await prisma.course.update({
        where: { id: courseId },
        data: {
          isPublished: true,
          publishedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      notifyCoursePublished(session.userId, course.title, course.id).catch(() => {});
      return NextResponse.json({ data: updated, message: 'Course submitted for validation' });
    }

    if (action === 'unpublish') {
      const updated = await prisma.course.update({
        where: { id: courseId },
        data: {
          isPublished: false,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({ data: updated, message: 'Course unpublished' });
    }

    return NextResponse.json({ message: 'Invalid action. Use "publish" or "unpublish"' }, { status: 400 });
  } catch (error) {
    return handleApiError(error);
  }
}
