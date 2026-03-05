
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;

    const course = await prisma.course.findFirst({
      where: { slug },
      include: {
        forum: {
          include: {
            subjects: {
              include: {
                member: {
                  include: {
                    user: {
                      include: {
                        person: true
                      }
                    }
                  }
                },
                _count: {
                  select: { forumMessages: true }
                }
              },
              orderBy: { createdAt: 'desc' }
            }
          }
        }
      }
    });

    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    // Check enrollment (optional for listing? maybe public forum? usually private)
    // For now, assume private to enrolled students/instructors
    // We can reuse the enrollment check logic if needed, but let's just return the list for now
    // logic: if user is logged in, they can see titles. Content might be restricted?
    // Let's restrict everything to enrolled students/instructors.

    const userId = session.userId;
    const isInstructor = course.instructorId && (await prisma.instructor.findUnique({ where: { id: course.instructorId }, select: { userId: true } }))?.userId === userId;
    
    if (!isInstructor) {
        const student = await prisma.student.findUnique({ where: { userId } });
        if (!student) return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        
        const enrollment = await prisma.studentCourse.findUnique({
            where: {
                studentId_courseId: {
                    studentId: student.id,
                    courseId: course.id
                }
            }
        });

        if (!enrollment) return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    if (!course.forum) {
      return NextResponse.json({ data: [] });
    }

    return NextResponse.json({ data: course.forum.subjects });

  } catch (error) {
    console.error('Forum subjects fetch error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;
    const { content } = await req.json(); // content is mapped to 'content' in Subject model? No, title is likely content?
    // Subject model: content, reference, isSolved. No explicit 'title'.
    // Usually 'content' is the title/initial message.
    
    if (!content) {
        return NextResponse.json({ message: 'Content is required' }, { status: 400 });
    }

    const course = await prisma.course.findFirst({
      where: { slug },
      include: { forum: true }
    });

    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
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

    // Ensure Forum exists
    let forum = course.forum;
    if (!forum) {
        forum = await prisma.forum.create({
            data: { courseId: course.id }
        });
    }

    // Create Subject
    const subject = await prisma.subject.create({
        data: {
            forumId: forum.id,
            memberId: member.id,
            content: content, // This acts as the title/subject
            isSolved: false,
            createdAt: new Date(),
            reference: `SUB-${Date.now()}` // Generate a reference
        }
    });

    return NextResponse.json({ data: subject }, { status: 201 });

  } catch (error) {
    console.error('Forum subject create error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
