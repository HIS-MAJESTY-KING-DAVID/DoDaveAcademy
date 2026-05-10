import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string; subjectId: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { subjectId } = await params;
    const sId = parseInt(subjectId);

    if (isNaN(sId)) {
      return NextResponse.json({ message: 'Invalid subject ID' }, { status: 400 });
    }

    const subject = await prisma.subject.findUnique({
      where: { id: sId },
      include: {
        forum: {
          include: { course: true },
        },
      },
    });

    if (!subject) {
      return NextResponse.json({ message: 'Subject not found' }, { status: 404 });
    }

    // Verify the user is the subject author or course instructor
    const member = await prisma.member.findUnique({
      where: { userId: session.userId },
    });

    if (!member) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const isAuthor = subject.memberId === member.id;
    const course = subject.forum?.course;
    const isInstructor = course?.instructorId
      ? (await prisma.instructor.findUnique({ where: { id: course.instructorId } }))?.userId === session.userId
      : false;

    if (!isAuthor && !isInstructor) {
      return NextResponse.json({ message: 'Only the author or course instructor can mark as solved' }, { status: 403 });
    }

    const updated = await prisma.subject.update({
      where: { id: sId },
      data: { isSolved: !subject.isSolved },
    });

    return NextResponse.json({
      data: {
        id: updated.id,
        isSolved: updated.isSolved,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
