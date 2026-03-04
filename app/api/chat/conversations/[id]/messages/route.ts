
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const conversationId = parseInt(id);

    if (isNaN(conversationId)) {
        return NextResponse.json({ message: 'Invalid conversation ID' }, { status: 400 });
    }

    // Verify participation
    const participant = await prisma.participant.findUnique({
      where: {
        conversationId_userId: {
          conversationId: conversationId,
          userId: session.userId
        }
      }
    });

    if (!participant) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const messages = await prisma.chatMessage.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      include: {
          sender: {
              include: {
                  person: true
              }
          }
      }
    });

    return NextResponse.json({ data: messages });
  } catch (error) {
    console.error('Messages fetch error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

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
    const conversationId = parseInt(id);
    const { content } = await req.json();

    if (!content) {
        return NextResponse.json({ message: 'Content is required' }, { status: 400 });
    }

    // Verify participation
    const participant = await prisma.participant.findUnique({
      where: {
        conversationId_userId: {
          conversationId: conversationId,
          userId: session.userId
        }
      }
    });

    if (!participant) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Create message
    const message = await prisma.chatMessage.create({
      data: {
        conversationId,
        senderId: session.userId,
        content
      },
      include: {
          sender: {
              include: {
                  person: true
              }
          }
      }
    });

    // Update conversation timestamp
    await prisma.conversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() }
    });

    // Here we would trigger Supabase Realtime / Pusher event
    // e.g. pusher.trigger(`conversation-${conversationId}`, 'new-message', message);

    return NextResponse.json({ data: message }, { status: 201 });

  } catch (error) {
    console.error('Message send error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
