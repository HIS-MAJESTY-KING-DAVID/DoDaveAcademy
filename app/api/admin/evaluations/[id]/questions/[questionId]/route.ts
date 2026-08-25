import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

async function requireAdmin() {
  const session = await getSession();
  return session?.roles?.includes('ROLE_ADMIN') ? session : null;
}

function normalizeQuestion(body: Record<string, unknown>) {
  const question = typeof body.question === 'string' ? body.question.trim() : '';
  const proposition1 = typeof body.proposition1 === 'string' ? body.proposition1.trim() : '';
  const proposition2 = typeof body.proposition2 === 'string' ? body.proposition2.trim() : '';
  const proposition3 = typeof body.proposition3 === 'string' && body.proposition3.trim() ? body.proposition3.trim() : null;
  const proposition4 = typeof body.proposition4 === 'string' && body.proposition4.trim() ? body.proposition4.trim() : null;
  const correct = Array.isArray(body.correctPropositions)
    ? body.correctPropositions.map(String).filter((value) => ['1', '2', '3', '4'].includes(value))
    : typeof body.correctPropositions === 'string'
      ? body.correctPropositions.split(',').map((value) => value.trim()).filter((value) => ['1', '2', '3', '4'].includes(value))
      : [];
  if (!question || !proposition1 || !proposition2 || !correct.length || (correct.includes('3') && !proposition3) || (correct.includes('4') && !proposition4)) return null;
  return { question, proposition1, proposition2, proposition3, proposition4, correctPropositions: [...new Set(correct)].join(',') };
}

async function getQuestion(evaluationId: number, questionId: number) {
  return prisma.evaluationQuestion.findFirst({ where: { id: questionId, evaluationId }, include: { evaluation: { select: { isPassed: true } } } });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string; questionId: string }> }) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const { id, questionId } = await params;
    const evaluationId = Number(id);
    const parsedQuestionId = Number(questionId);
    const existing = await getQuestion(evaluationId, parsedQuestionId);
    if (!existing || !existing.evaluation) return NextResponse.json({ message: 'Question not found' }, { status: 404 });
    if (existing.evaluation.isPassed) return NextResponse.json({ message: 'Passed evaluations are locked' }, { status: 409 });
    const data = normalizeQuestion(await req.json());
    if (!data) return NextResponse.json({ message: 'Invalid question data' }, { status: 400 });
    const question = await prisma.evaluationQuestion.update({ where: { id: parsedQuestionId }, data });
    return NextResponse.json({ question });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string; questionId: string }> }) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const { id, questionId } = await params;
    const existing = await getQuestion(Number(id), Number(questionId));
    if (!existing || !existing.evaluation) return NextResponse.json({ message: 'Question not found' }, { status: 404 });
    if (existing.evaluation.isPassed) return NextResponse.json({ message: 'Passed evaluations are locked' }, { status: 409 });
    await prisma.evaluationQuestion.delete({ where: { id: Number(questionId) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
