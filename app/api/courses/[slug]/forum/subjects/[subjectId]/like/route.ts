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

    let member = await prisma.member.findUnique({
      where: { userId: session.userId },
    });

    if (!member) {
      member = await prisma.member.create({
        data: { userId: session.userId },
      });
    }

    const messageIds = await req.json().then(b => b.messageIds).catch(() => null);

    // If specific message IDs provided, toggle likes on those messages
    if (Array.isArray(messageIds) && messageIds.length > 0) {
      const results = [];
      for (const msgId of messageIds) {
        const existing = await prisma.likeMessageForum.findFirst({
          where: {
            forumMessageId: msgId,
            memberId: member.id,
          },
        });

        if (existing) {
          await prisma.likeMessageForum.delete({ where: { id: existing.id } });
          await prisma.forumMessage.update({
            where: { id: msgId },
            data: { likes: { decrement: 1 } },
          });
          results.push({ messageId: msgId, liked: false });
        } else {
          await prisma.likeMessageForum.create({
            data: {
              forumMessageId: msgId,
              memberId: member.id,
            },
          });
          await prisma.forumMessage.update({
            where: { id: msgId },
            data: { likes: { increment: 1 } },
          });
          results.push({ messageId: msgId, liked: true });
        }
      }
      return NextResponse.json({ data: results });
    }

    // Legacy behavior: like the subject's first message (the original post)
    const firstMessage = await prisma.forumMessage.findFirst({
      where: { subjectId: sId },
      orderBy: { createdAt: 'asc' },
    });

    if (!firstMessage) {
      return NextResponse.json({ message: 'No messages in this subject' }, { status: 404 });
    }

    const existing = await prisma.likeMessageForum.findFirst({
      where: {
        forumMessageId: firstMessage.id,
        memberId: member.id,
      },
    });

    if (existing) {
      await prisma.likeMessageForum.delete({ where: { id: existing.id } });
      await prisma.forumMessage.update({
        where: { id: firstMessage.id },
        data: { likes: { decrement: 1 } },
      });
      return NextResponse.json({ data: { liked: false, likes: (firstMessage.likes || 1) - 1 } });
    }

    await prisma.likeMessageForum.create({
      data: {
        forumMessageId: firstMessage.id,
        memberId: member.id,
      },
    });
    await prisma.forumMessage.update({
      where: { id: firstMessage.id },
      data: { likes: { increment: 1 } },
    });

    return NextResponse.json({ data: { liked: true, likes: (firstMessage.likes || 0) + 1 } });
  } catch (error) {
    return handleApiError(error);
  }
}
