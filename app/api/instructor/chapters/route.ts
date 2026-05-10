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

    const { courseId, title, description, number } = await req.json();

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course || course.instructorId !== instructor.id) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();

    const chapter = await prisma.chapter.create({
      data: {
        courseId,
        title,
        slug,
        description: description || '',
        number: number || 1,
      },
    });

    return NextResponse.json({ data: chapter }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
