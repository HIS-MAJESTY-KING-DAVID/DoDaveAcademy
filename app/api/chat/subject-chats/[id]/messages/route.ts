import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/exceptions';
import { getSubjectChatForUser } from '@/lib/subject-chat';

function parseId(value: string) {
  const id = Number.parseInt(value, 10);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const id = parseId((await params).id);
    if (!id) return NextResponse.json({ message: 'Invalid subject chat ID' }, { status: 400 });

    const { principal, room } = await getSubjectChatForUser(id, session.userId);
    if (!principal.canUseSubjectChat) {
      return NextResponse.json({ message: 'Subject chat requires an active premium entitlement', requiresPremium: true }, { status: 403 });
    }
    if (!room) return NextResponse.json({ message: 'Subject chat not found' }, { status: 404 });

    await prisma.subjectChatMessage.updateMany({
      where: { subjectChatId: room.id, senderId: { not: session.userId }, isRead: false },
      data: { isRead: true },
    });

    const messages = await prisma.subjectChatMessage.findMany({
      where: { subjectChatId: room.id },
      orderBy: { createdAt: 'asc' },
      include: { sender: { include: { person: true } } },
    });

    return NextResponse.json({ data: messages });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const id = parseId((await params).id);
    if (!id) return NextResponse.json({ message: 'Invalid subject chat ID' }, { status: 400 });

    const { principal, room } = await getSubjectChatForUser(id, session.userId);
    if (!principal.canUseSubjectChat) {
      return NextResponse.json({ message: 'Subject chat requires an active premium entitlement', requiresPremium: true }, { status: 403 });
    }
    if (!room) return NextResponse.json({ message: 'Subject chat not found' }, { status: 404 });

    const body = await req.json();
    const content = typeof body.content === 'string' ? body.content.trim() : '';
    if (!content || content.length > 5000) {
      return NextResponse.json({ message: 'Message is required and must be at most 5,000 characters' }, { status: 400 });
    }

    const message = await prisma.subjectChatMessage.create({
      data: { subjectChatId: room.id, senderId: session.userId, content },
      include: { sender: { include: { person: true } } },
    });

    return NextResponse.json({ data: message }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
