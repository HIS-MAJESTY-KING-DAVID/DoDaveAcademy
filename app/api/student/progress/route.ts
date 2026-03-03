import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { lessonId, courseId, chapterId, isFinished } = await req.json();

    if (!lessonId) {
        return NextResponse.json({ message: 'Lesson ID is required' }, { status: 400 });
    }

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
            lessonId: Number(lessonId)
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
                lessonId: Number(lessonId),
                courseId: courseId ? Number(courseId) : undefined,
                chapterId: chapterId ? Number(chapterId) : undefined,
                startAt: new Date(),
                isFinished: isFinished === true,
                endAt: isFinished ? new Date() : undefined,
            }
        });
    }

    return NextResponse.json({ message: 'Progress updated' }, { status: 200 });

  } catch (error) {
    console.error('Progress update error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
