import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const student = await prisma.student.findUnique({ where: { userId: session.userId }, select: { id: true } });
    if (!student) return NextResponse.json({ message: 'Student profile not found' }, { status: 403 });

    const evaluations = await prisma.evaluationStudent.findMany({
      where: { studentId: student.id },
      include: {
        evaluation: {
          include: {
            category: true,
            _count: { select: { evaluationQuestions: true } },
            evaluationResults: { where: { studentId: student.id }, select: { id: true, score: true, evaluatedAt: true } },
          },
        },
      },
      orderBy: { evaluation: { startAt: 'desc' } },
    });

    return NextResponse.json({ evaluations: evaluations.map((entry) => entry.evaluation) });
  } catch (error) {
    return handleApiError(error);
  }
}
