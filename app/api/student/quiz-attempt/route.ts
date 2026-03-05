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

    let score = 0;
    const total = chapter.quizzes.length;

    for (const quiz of chapter.quizzes) {
        const studentAnswer = answers[String(quiz.id)];
        
        // Find correct proposition
        const correctProposition = quiz.propositions.find(p => p.isTrue);
        
        // Compare content (assuming content is unique and what is sent from frontend)
        // Or should we send propositionId? 
        // Frontend sends proposition content: handleAnswer(prop).
        const isCorrect = correctProposition && correctProposition.content === studentAnswer;

        if (isCorrect) {
            score++;
        }

        // Save result
        await prisma.quizResult.create({
            data: {
                quizId: quiz.id,
                studentId: student.id,
                result: typeof studentAnswer === 'string' ? studentAnswer : '',
                isCorrect: !!isCorrect,
                score: isCorrect ? 1 : 0,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
    }

    return NextResponse.json({ score, total }, { status: 200 });

  } catch (error) {
    return handleApiError(error);
  }
}
