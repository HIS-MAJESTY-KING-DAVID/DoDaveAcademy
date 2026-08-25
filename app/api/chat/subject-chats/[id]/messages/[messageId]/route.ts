import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/exceptions';
import { getSubjectChatForUser } from '@/lib/subject-chat';

function parseId(value: string) {
  const id = Number.parseInt(value, 10);
  return Number.isInteger(id) && id > 0 ? id : null;
}

async function getOwnedMessage(subjectChatId: number, messageId: number, userId: number) {
  const access = await getSubjectChatForUser(subjectChatId, userId);
  if (!access.principal.canUseSubjectChat) return { access, message: null };
  if (!access.room) return { access, message: null };

  const message = await prisma.subjectChatMessage.findFirst({
    where: { id: messageId, subjectChatId: access.room.id, senderId: userId, isDeleted: false },
  });
  return { access, message };
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; messageId: string }> },
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const routeParams = await params;
    const subjectChatId = parseId(routeParams.id);
    const messageId = parseId(routeParams.messageId);
    if (!subjectChatId || !messageId) return NextResponse.json({ message: 'Invalid subject chat or message ID' }, { status: 400 });

    const { access, message } = await getOwnedMessage(subjectChatId, messageId, session.userId);
    if (!access.principal.canUseSubjectChat) return NextResponse.json({ message: 'Subject chat access is not available' }, { status: 403 });
    if (!message) return NextResponse.json({ message: 'Message not found' }, { status: 404 });

    const body = await req.json();
    const content = typeof body.content === 'string' ? body.content.trim() : '';
    if (!content || content.length > 5000) return NextResponse.json({ message: 'Message is required and must be at most 5,000 characters' }, { status: 400 });

    const updated = await prisma.subjectChatMessage.update({
      where: { id: message.id },
      data: { content, editedAt: new Date() },
      include: { sender: { include: { person: true } } },
    });
    return NextResponse.json({ data: updated });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; messageId: string }> },
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const routeParams = await params;
    const subjectChatId = parseId(routeParams.id);
    const messageId = parseId(routeParams.messageId);
    if (!subjectChatId || !messageId) return NextResponse.json({ message: 'Invalid subject chat or message ID' }, { status: 400 });

    const { access, message } = await getOwnedMessage(subjectChatId, messageId, session.userId);
    if (!access.principal.canUseSubjectChat) return NextResponse.json({ message: 'Subject chat access is not available' }, { status: 403 });
    if (!message) return NextResponse.json({ message: 'Message not found' }, { status: 404 });

    await prisma.subjectChatMessage.update({ where: { id: message.id }, data: { isDeleted: true, editedAt: new Date() } });
    return NextResponse.json({ deleted: true, id: message.id });
  } catch (error) {
    return handleApiError(error);
  }
}
