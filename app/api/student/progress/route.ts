import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { progressSchema } from '@/lib/validations/student';
import { handleApiError } from '@/lib/exceptions';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { lessonId, courseId, chapterId, isFinished } = progressSchema.parse(body);

    const student = await prisma.student.findUnique({
      where: { userId: session.userId },
    });

    if (!student) {
        return NextResponse.json({ message: 'Student profile not found' }, { status: 404 });
    }

    // Check existing lecture
    const existingLecture = await prisma.lecture.findFirst({
        where: {
            studentId: student.id,
            lessonId: lessonId
        }
    });

    if (existingLecture) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = {};
        if (isFinished !== undefined) {
            data.isFinished = isFinished === true;
            if (isFinished) {
                data.endAt = new Date();
            }
        }
        
        await prisma.lecture.update({
            where: { id: existingLecture.id },
            data
        });
    } else {
        await prisma.lecture.create({
            data: {
                studentId: student.id,
                lessonId: lessonId,
                courseId: courseId,
                chapterId: chapterId,
                startAt: new Date(),
                isFinished: isFinished === true,
                endAt: isFinished ? new Date() : undefined,
            }
        });
    }

    return NextResponse.json({ message: 'Progress updated' }, { status: 200 });

  } catch (error) {
    return handleApiError(error);
  }
}
