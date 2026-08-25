import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: { userId: session.userId },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              include: { person: true },
            },
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ data: conversations });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const recipientId = Number(body.recipientId);
    if (!Number.isInteger(recipientId) || recipientId <= 0 || recipientId === session.userId) {
      return NextResponse.json({ message: 'A valid different recipient is required' }, { status: 400 });
    }

    const recipient = await prisma.user.findFirst({
      where: {
        id: recipientId,
        OR: [{ isBlocked: false }, { isBlocked: null }],
      },
      select: { id: true },
    });
    if (!recipient) {
      return NextResponse.json({ message: 'Recipient not found' }, { status: 404 });
    }

    const candidateConversations = await prisma.conversation.findMany({
      where: {
        participants: { some: { userId: session.userId } },
      },
      include: { participants: { select: { userId: true } } },
    });
    const existingConversation = candidateConversations.find((conversation) => {
      const ids = conversation.participants.map((participant) => participant.userId).sort((a, b) => a - b);
      return ids.length === 2 && ids[0] === Math.min(session.userId, recipientId) && ids[1] === Math.max(session.userId, recipientId);
    });

    if (existingConversation) {
      const conversation = await prisma.conversation.findUnique({
        where: { id: existingConversation.id },
        include: {
          participants: {
            include: { user: { include: { person: true } } },
          },
        },
      });
      return NextResponse.json({ data: conversation });
    }

    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          create: [{ userId: session.userId }, { userId: recipientId }],
        },
      },
      include: {
        participants: {
          include: { user: { include: { person: true } } },
        },
      },
    });

    return NextResponse.json({ data: conversation }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
