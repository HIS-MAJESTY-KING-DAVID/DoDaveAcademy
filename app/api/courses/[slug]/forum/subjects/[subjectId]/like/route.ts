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
      select: { id: true },
    });
    if (!subject) return NextResponse.json({ message: 'Subject not found' }, { status: 404 });

    let member = await prisma.member.findUnique({ where: { userId: session.userId } });
    if (!member) member = await prisma.member.create({ data: { userId: session.userId } });

    const body = await req.json().catch(() => ({}));
    const requestedIds = Array.isArray(body.messageIds)
      ? body.messageIds.filter((id: unknown): id is number => typeof id === 'number' && Number.isInteger(id) && id > 0)
      : [];

    const messages = requestedIds.length > 0
      ? await prisma.forumMessage.findMany({ where: { id: { in: requestedIds }, subjectId: sId }, orderBy: { createdAt: 'asc' } })
      : await prisma.forumMessage.findMany({ where: { subjectId: sId }, orderBy: { createdAt: 'asc' }, take: 1 });

    if (messages.length === 0) return NextResponse.json({ message: 'No messages in this subject' }, { status: 404 });
    if (requestedIds.length > 0 && messages.length !== requestedIds.length) return NextResponse.json({ message: 'One or more messages do not belong to this subject' }, { status: 400 });

    const results = [];
    for (const message of messages) {
      const existing = await prisma.likeMessageForum.findFirst({ where: { forumMessageId: message.id, memberId: member.id } });
      if (existing) {
        await prisma.likeMessageForum.delete({ where: { id: existing.id } });
        await prisma.forumMessage.update({ where: { id: message.id }, data: { likes: { decrement: 1 } } });
        results.push({ messageId: message.id, liked: false, likes: Math.max((message.likes || 1) - 1, 0) });
      } else {
        await prisma.likeMessageForum.create({ data: { forumMessageId: message.id, memberId: member.id } });
        await prisma.forumMessage.update({ where: { id: message.id }, data: { likes: { increment: 1 } } });
        results.push({ messageId: message.id, liked: true, likes: (message.likes || 0) + 1 });
      }
    }

    return NextResponse.json({ data: results.length === 1 ? results[0] : results });
  } catch (error) {
    return handleApiError(error);
  }
}
