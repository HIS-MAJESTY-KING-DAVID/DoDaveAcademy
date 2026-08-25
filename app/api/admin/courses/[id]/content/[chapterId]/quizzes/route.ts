import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

function slugValue(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string; chapterId: string }> }) {
  try {
    const session = await getSession();
    if (!session?.roles?.includes('ROLE_ADMIN')) return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    const routeParams = await params;
    const courseId = Number.parseInt(routeParams.id, 10);
    const chapterId = Number.parseInt(routeParams.chapterId, 10);
    if (![courseId, chapterId].every((value) => Number.isInteger(value) && value > 0)) return NextResponse.json({ message: 'Invalid course or chapter ID' }, { status: 400 });

    const chapter = await prisma.chapter.findFirst({ where: { id: chapterId, courseId }, select: { id: true } });
    if (!chapter) return NextResponse.json({ message: 'Chapter not found' }, { status: 404 });

    const form = await req.formData();
    const question = String(form.get('question') || '').trim();
    const proposition1 = String(form.get('proposition1') || '').trim() || null;
    const proposition2 = String(form.get('proposition2') || '').trim() || null;
    const proposition3 = String(form.get('proposition3') || '').trim() || null;
    const proposition4 = String(form.get('proposition4') || '').trim() || null;
    const correct = String(form.get('correctPropositions') || '').split(',').map((value) => value.trim()).filter((value) => ['1', '2', '3', '4'].includes(value));
    const reference = String(form.get('reference') || '').trim() || `quiz-${Date.now().toString(36)}`;
    if (!question || question.length > 5000) return NextResponse.json({ message: 'A question is required' }, { status: 400 });
    if (!proposition1 || !proposition2) return NextResponse.json({ message: 'At least two propositions are required' }, { status: 400 });
    if (correct.length === 0 || correct.some((value) => ![proposition1, proposition2, proposition3, proposition4][Number(value) - 1])) return NextResponse.json({ message: 'Choose at least one valid correct proposition' }, { status: 400 });

    const quiz = await prisma.quiz.create({
      data: { chapterId, courseId, question, reference: `${slugValue(reference) || 'quiz'}-${Date.now().toString(36)}`, proposition1, proposition2, proposition3, proposition4, correctPropositions: [...new Set(correct)].join(',') },
    });
    return NextResponse.redirect(new URL(`/admin/courses/${courseId}/content?createdQuiz=${quiz.id}`, req.url));
  } catch (error) {
    return handleApiError(error);
  }
}
