
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId: session.userId
          }
        }
      },
      include: {
        participants: {
          include: {
            user: {
              include: {
                person: true
              }
            }
          }
        },
        messages: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return NextResponse.json({ data: conversations });
  } catch (error) {
    console.error('Conversations fetch error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { recipientId } = await req.json();

    if (!recipientId) {
      return NextResponse.json({ message: 'Recipient ID is required' }, { status: 400 });
    }

    // Check if conversation already exists between these two users
    // This is a bit complex with Prisma many-to-many, but we can do it by finding a conversation
    // where both users are participants and the count of participants is 2.
    // For simplicity, let's just create a new one or find one where ONLY these two are participants.
    
    // Simplification: Find any conversation where both are participants.
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { userId: session.userId } } },
          { participants: { some: { userId: recipientId } } }
        ]
      },
      include: {
          participants: true
      }
    });

    if (existingConversation) {
        return NextResponse.json({ data: existingConversation });
    }

    // Create new conversation
    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          create: [
            { userId: session.userId },
            { userId: recipientId }
          ]
        }
      },
      include: {
        participants: {
            include: {
                user: {
                    include: {
                        person: true
                    }
                }
            }
        }
      }
    });

    return NextResponse.json({ data: conversation }, { status: 201 });

  } catch (error) {
    console.error('Conversation create error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
