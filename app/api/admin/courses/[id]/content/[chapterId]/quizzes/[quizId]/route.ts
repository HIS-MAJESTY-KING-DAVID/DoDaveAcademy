import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

export async function POST(req: Request, { params }: { params: Promise<{ id: string; chapterId: string; quizId: string }> }) {
  try {
    const session = await getSession();
    if (!session?.roles?.includes('ROLE_ADMIN')) return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    const routeParams = await params;
    const courseId = Number.parseInt(routeParams.id, 10);
    const chapterId = Number.parseInt(routeParams.chapterId, 10);
    const quizId = Number.parseInt(routeParams.quizId, 10);
    if (![courseId, chapterId, quizId].every((value) => Number.isInteger(value) && value > 0)) return NextResponse.json({ message: 'Invalid course, chapter, or quiz ID' }, { status: 400 });

    const quiz = await prisma.quiz.findFirst({ where: { id: quizId, chapterId, courseId }, select: { id: true } });
    if (!quiz) return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });

    const form = await req.formData();
    if (String(form.get('_action') || 'update') === 'delete') {
      await prisma.quiz.delete({ where: { id: quizId } });
      return NextResponse.redirect(new URL(`/admin/courses/${courseId}/content?deletedQuiz=${quizId}`, req.url));
    }

    const question = String(form.get('question') || '').trim();
    const values = [1, 2, 3, 4].map((index) => String(form.get(`proposition${index}`) || '').trim() || null);
    const correct = [...new Set(String(form.get('correctPropositions') || '').split(',').map((value) => value.trim()).filter((value) => ['1', '2', '3', '4'].includes(value)))];
    if (!question || question.length > 5000 || !values[0] || !values[1]) return NextResponse.json({ message: 'Question and at least two propositions are required' }, { status: 400 });
    if (correct.length === 0 || correct.some((value) => !values[Number(value) - 1])) return NextResponse.json({ message: 'Choose at least one valid correct proposition' }, { status: 400 });

    const updated = await prisma.quiz.update({ where: { id: quizId }, data: { question, proposition1: values[0], proposition2: values[1], proposition3: values[2], proposition4: values[3], correctPropositions: correct.join(',') } });
    return NextResponse.redirect(new URL(`/admin/courses/${courseId}/content?updatedQuiz=${updated.id}`, req.url));
  } catch (error) {
    return handleApiError(error);
  }
}
