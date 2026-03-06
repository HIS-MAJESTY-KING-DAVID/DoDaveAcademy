import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { reviewSchema } from '@/lib/validations/student';
import { handleApiError } from '@/lib/exceptions';

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
    const body = await req.json();
    const { rating, message } = reviewSchema.parse(body);

    const student = await prisma.student.findUnique({
      where: { userId: session.userId },
    });

    if (!student) {
        return NextResponse.json({ message: 'Student profile not found' }, { status: 403 });
    }

    const course = await prisma.course.findFirst({
        where: { slug }
    });

    if (!course) {
        return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    // Check enrollment
    const enrollment = await prisma.studentCourse.findUnique({
        where: {
            studentId_courseId: {
                studentId: student.id,
                courseId: course.id
            }
        }
    });

    if (!enrollment) {
        return NextResponse.json({ message: 'You must be enrolled to review this course' }, { status: 403 });
    }

    // Check existing review
    const existingReview = await prisma.review.findFirst({
        where: {
            studentId: student.id,
            courseId: course.id
        }
    });

    if (existingReview) {
        // Update existing review
        await prisma.review.update({
            where: { id: existingReview.id },
            data: {
                rating,
                message,
                createdAt: new Date() // Updating the date to show recent activity
            }
        });
        return NextResponse.json({ message: 'Review updated' }, { status: 200 });
    }

    await prisma.review.create({
        data: {
            studentId: student.id,
            courseId: course.id,
            rating,
            message,
            createdAt: new Date()
        }
    });

    return NextResponse.json({ message: 'Review submitted' }, { status: 201 });

  } catch (error) {
    return handleApiError(error);
  }
}
