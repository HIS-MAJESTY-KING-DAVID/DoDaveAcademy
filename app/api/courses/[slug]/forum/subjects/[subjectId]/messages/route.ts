
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string; subjectId: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { slug, subjectId } = await params;
    const sId = parseInt(subjectId);

    if (isNaN(sId)) {
        return NextResponse.json({ message: 'Invalid subject ID' }, { status: 400 });
    }

    // Verify subject belongs to course (optional but good for security)
    const subject = await prisma.subject.findUnique({
        where: { id: sId },
        include: {
            forum: {
                include: {
                    course: true
                }
            },
            member: {
                include: {
                    user: {
                        include: {
                            person: true
                        }
                    }
                }
            },
            forumMessages: {
                include: {
                    member: {
                        include: {
                            user: {
                                include: {
                                    person: true
                                }
                            }
                        }
                    }
                },
                orderBy: { createdAt: 'asc' }
            }
        }
    });

    if (!subject || subject.forum?.course?.slug !== slug) {
        return NextResponse.json({ message: 'Subject not found' }, { status: 404 });
    }

    return NextResponse.json({ data: subject });

  } catch (error) {
    console.error('Forum messages fetch error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string; subjectId: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { slug, subjectId } = await params;
    const sId = parseInt(subjectId);
    const { content } = await req.json();

    if (!content) {
        return NextResponse.json({ message: 'Content is required' }, { status: 400 });
    }

    // Ensure Member exists
    let member = await prisma.member.findUnique({
        where: { userId: session.userId }
    });

    if (!member) {
        member = await prisma.member.create({
            data: { userId: session.userId }
        });
    }

    const message = await prisma.forumMessage.create({
        data: {
            subjectId: sId,
            memberId: member.id,
            content: content,
            createdAt: new Date(),
            likes: 0,
            isAnswer: false,
            isResponse: true
        },
        include: {
            member: {
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

    return NextResponse.json({ data: message }, { status: 201 });

  } catch (error) {
    console.error('Forum message create error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
