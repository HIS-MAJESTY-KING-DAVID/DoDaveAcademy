import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { evaluationId, studentId, answers } = body;

    if (!evaluationId || !studentId || !answers) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const student = await prisma.student.findUnique({ where: { userId: session.userId } });
    if (!student || student.id !== studentId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const existing = await prisma.evaluationResult.findFirst({
      where: { evaluationId, studentId },
    });
    if (existing) {
      return NextResponse.json({ message: 'Already submitted' }, { status: 409 });
    }

    const questions = await prisma.evaluationQuestion.findMany({
      where: { evaluationId },
    });

    let correctCount = 0;
    for (const q of questions) {
      const correct = q.correctPropositions.split(',').map((s) => s.trim()).filter(Boolean);
      const studentAns = (answers[q.id.toString()] || []) as string[];
      const matched = correct.length === studentAns.length && correct.every((c) => studentAns.includes(c));
      if (matched) correctCount++;
    }

    const score = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;

    const result = await prisma.evaluationResult.create({
      data: {
        evaluationId,
        studentId,
        contents: JSON.stringify(answers),
        score,
        evaluatedAt: new Date(),
      },
    });

    return NextResponse.json({ id: result.id, score });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
