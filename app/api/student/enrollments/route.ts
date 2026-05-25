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

    const student = await prisma.student.findUnique({
      where: { userId: session.userId },
    });

    if (!student) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    const enrollments = await prisma.studentCourse.findMany({
      where: { studentId: student.id },
      include: {
        course: {
            include: {
                media: true,
                instructor: {
                    include: {
                        user: {
                            include: {
                                person: true
                            }
                        }
                    }
                },
                chapters: {
                    include: {
                        lessons: true
                    }
                }
            }
        }
      },
    });

    const courses = enrollments.map(e => e.course);

    return NextResponse.json({ data: courses }, { status: 200 });

  } catch (error) {
    return handleApiError(error);
  }
}
