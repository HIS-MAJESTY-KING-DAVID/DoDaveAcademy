
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';
import { getCourseForumAccess } from '@/lib/forum-access';

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

    const access = await getCourseForumAccess(slug, session.userId);
    if (!access.allowed) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ data: subject });

  } catch (error) {
    return handleApiError(error);
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
    if (Number.isNaN(sId)) {
        return NextResponse.json({ message: 'Invalid subject ID' }, { status: 400 });
    }

    const body = await req.json();
    const content = typeof body.content === 'string' ? body.content.trim() : '';
    if (!content || content.length > 10000) {
        return NextResponse.json({ message: 'Content is required and must be at most 10,000 characters' }, { status: 400 });
    }

    const access = await getCourseForumAccess(slug, session.userId);
    if (!access.allowed) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const subject = await prisma.subject.findFirst({
        where: {
            id: sId,
            forum: { courseId: access.course?.id },
        },
        select: { id: true },
    });
    if (!subject) {
        return NextResponse.json({ message: 'Subject not found' }, { status: 404 });
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
    return handleApiError(error);
  }
}
