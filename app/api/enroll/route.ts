import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { enrollSchema } from '@/lib/validations/student';
import { handleApiError } from '@/lib/exceptions';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { courseId } = enrollSchema.parse(body);

    // 1. Get Course
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    // 2. Get or Create Student
    let student = await prisma.student.findUnique({
      where: { userId: session.userId },
    });

    if (!student) {
        // Reference is unique string.
        const reference = `STU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        student = await prisma.student.create({
            data: {
                userId: session.userId,
                reference: reference,
                joinAt: new Date(),
            }
        });
    }

    // 3. Check existing enrollment
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

    // 4. Check if free
    if (course.isFree) {
      await prisma.studentCourse.create({
        data: {
          studentId: student.id,
          courseId: course.id,
        },
      });
      return NextResponse.json({ message: 'Enrolled successfully' }, { status: 201 });
    } else {
      // TODO: Handle paid enrollment (Phase 4)
      return NextResponse.json({ message: 'Payment required' }, { status: 402 });
    }

  } catch (error) {
    return handleApiError(error);
  }
}
