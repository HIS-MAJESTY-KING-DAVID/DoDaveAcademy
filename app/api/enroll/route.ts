import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { enrollSchema } from '@/lib/validations/student';
import { handleApiError } from '@/lib/exceptions';
import { notifyCourseEnrolled } from '@/lib/notifications';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { courseId } = enrollSchema.parse(body);

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    let student = await prisma.student.findUnique({
      where: { userId: session.userId },
    });

    if (!student) {
      const reference = `STU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      student = await prisma.student.create({
        data: {
          userId: session.userId,
          reference,
          joinAt: new Date(),
        },
      });
    }

    const existingEnrollment = await prisma.studentCourse.findUnique({
      where: {
        studentId_courseId: {
          studentId: student.id,
          courseId: course.id,
        },
      },
    });

    if (existingEnrollment) {
      return NextResponse.json({ message: 'Already enrolled' }, { status: 409 });
    }

    if (course.isFree) {
      await prisma.studentCourse.create({
        data: {
          studentId: student.id,
          courseId: course.id,
        },
      });
      notifyCourseEnrolled(session.userId, course.title).catch(() => {});
      return NextResponse.json({ message: 'Enrolled successfully' }, { status: 201 });
    }

    return NextResponse.json({
      message: 'Payment required',
      redirectTo: `/payment?courseId=${course.id}`,
    }, { status: 402 });

  } catch (error) {
    return handleApiError(error);
  }
}
