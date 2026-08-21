import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

async function getOwnedQuestion(evaluationId: number, questionId: number) {
  const session = await getSession();
  if (!session) return { session: null, question: null, evaluation: null };
  const instructor = await prisma.instructor.findUnique({ where: { userId: session.userId }, select: { id: true } });
  if (!instructor) return { session, question: null, evaluation: null };
  const question = await prisma.evaluationQuestion.findFirst({ where: { id: questionId, evaluationId }, include: { evaluation: true } });
  if (!question || question.evaluation?.instructorId !== instructor.id) return { session, question: null, evaluation: null };
  return { session, question, evaluation: question.evaluation };
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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; questionId: string }> },
) {
  try {
    const { id, questionId } = await params;
    const result = await getOwnedQuestion(Number(id), Number(questionId));
    if (!result.session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (!result.question || !result.evaluation) return NextResponse.json({ message: 'Question not found' }, { status: 404 });
    if (result.evaluation.isPassed) return NextResponse.json({ message: 'Passed evaluations are locked' }, { status: 409 });
    const data = normalizeQuestion(await req.json());
    if (!data) return NextResponse.json({ message: 'Invalid question data' }, { status: 400 });
    const question = await prisma.evaluationQuestion.update({ where: { id: Number(questionId) }, data });
    return NextResponse.json({ question });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; questionId: string }> },
) {
  try {
    const { id, questionId } = await params;
    const result = await getOwnedQuestion(Number(id), Number(questionId));
    if (!result.session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (!result.question || !result.evaluation) return NextResponse.json({ message: 'Question not found' }, { status: 404 });
    if (result.evaluation.isPassed) return NextResponse.json({ message: 'Passed evaluations are locked' }, { status: 409 });
    await prisma.evaluationQuestion.delete({ where: { id: Number(questionId) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
