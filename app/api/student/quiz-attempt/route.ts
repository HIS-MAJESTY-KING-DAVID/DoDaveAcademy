import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { quizAttemptSchema } from '@/lib/validations/student';
import { handleApiError } from '@/lib/exceptions';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { chapterId, answers } = quizAttemptSchema.parse(body);

    const student = await prisma.student.findUnique({
      where: { userId: session.userId },
    });

    if (!student) {
        return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    const chapter = await prisma.chapter.findUnique({
        where: { id: chapterId },
        include: {
            quizzes: {
                include: {
                    propositions: true
                }
            }
        }
    });

    if (!chapter) {
        return NextResponse.json({ message: 'Chapter not found' }, { status: 404 });
    }

    let correctCount = 0;
    const total = chapter.quizzes.length;
    const results = [];

    for (const quiz of chapter.quizzes) {
        const studentAnswer = answers[String(quiz.id)];
        
        // Find correct proposition
        const correctProposition = quiz.propositions.find(p => p.isTrue);
        
        const isCorrect = correctProposition && correctProposition.content === studentAnswer;

        if (isCorrect) {
            correctCount++;
        }

        results.push({
            quizId: quiz.id,
            studentId: student.id,
            result: typeof studentAnswer === 'string' ? studentAnswer : '',
            isCorrect: !!isCorrect,
            score: isCorrect ? 1 : 0,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    // Save results using transaction
    await prisma.$transaction(
        results.map(result => prisma.quizResult.create({ data: result }))
    );

    const percentage = total > 0 ? (correctCount / total) * 100 : 0;
    const isPassed = percentage >= 70; // 70% threshold

    // Update QuizLost (Attempt tracking)
    const existingAttempt = await prisma.quizLost.findFirst({
        where: {
            studentId: student.id,
            chapterId: chapter.id
        }
    });

    if (existingAttempt) {
        await prisma.quizLost.update({
            where: { id: existingAttempt.id },
            data: {
                attempt: { increment: 1 },
                lastAt: new Date(),
                isOk: isPassed,
                nextAt: new Date() // No delay enforced here for now
            }
        });
    } else {
        await prisma.quizLost.create({
            data: {
                studentId: student.id,
                chapterId: chapter.id,
                courseId: chapter.courseId,
                attempt: 1,
                lastAt: new Date(),
                nextAt: new Date(),
                isOk: isPassed
            }
        });
    }

    // Update Lecture progress if passed
    if (isPassed) {
        const existingLecture = await prisma.lecture.findFirst({
            where: {
                studentId: student.id,
                chapterId: chapter.id,
                lessonId: null // Chapter level
            }
        });

        if (existingLecture) {
            await prisma.lecture.update({
                where: { id: existingLecture.id },
                data: {
                    isFinished: true,
                    endAt: new Date(),
                    note: percentage
                }
            });
        } else {
            await prisma.lecture.create({
                data: {
                    studentId: student.id,
                    chapterId: chapter.id,
                    courseId: chapter.courseId,
                    startAt: new Date(),
                    endAt: new Date(),
                    isFinished: true,
                    note: percentage
                }
            });
        }
    }

    return NextResponse.json({ 
        score: correctCount, 
        total, 
        percentage,
        isPassed 
    }, { status: 200 });

  } catch (error) {
    return handleApiError(error);
  }
}
