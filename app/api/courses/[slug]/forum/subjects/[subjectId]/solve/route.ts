import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';
import { getCourseForumAccess } from '@/lib/forum-access';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string; subjectId: string }> },
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { slug, subjectId } = await params;
    const sId = Number.parseInt(subjectId, 10);
    if (Number.isNaN(sId)) return NextResponse.json({ message: 'Invalid subject ID' }, { status: 400 });

    const access = await getCourseForumAccess(slug, session.userId);
    if (!access.course) return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    if (!access.allowed) return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

    const subject = await prisma.subject.findFirst({
      where: { id: sId, forum: { courseId: access.course.id } },
      include: { forum: { include: { course: true } } },
    });
    if (!subject) return NextResponse.json({ message: 'Subject not found' }, { status: 404 });

    const member = await prisma.member.findUnique({ where: { userId: session.userId } });
    if (!member) return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

    const isAuthor = subject.memberId === member.id;
    const isInstructor = subject.forum?.course?.instructorId
      ? (await prisma.instructor.findUnique({ where: { id: subject.forum.course.instructorId } }))?.userId === session.userId
      : false;

    if (!isAuthor && !isInstructor) {
      return NextResponse.json({ message: 'Only the author or course instructor can mark as solved' }, { status: 403 });
    }

    const updated = await prisma.subject.update({ where: { id: sId }, data: { isSolved: !subject.isSolved } });
    return NextResponse.json({ data: { id: updated.id, isSolved: updated.isSolved } });
  } catch (error) {
    return handleApiError(error);
  }
}
