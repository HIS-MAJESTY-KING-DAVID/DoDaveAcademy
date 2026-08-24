import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

async function requireAdmin() {
  const session = await getSession();
  return session?.roles?.includes('ROLE_ADMIN') ? session : null;
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const evaluation = await prisma.evaluation.findUnique({ where: { id: Number((await params).id) }, include: { category: true, instructor: { include: { user: { include: { person: true } } } }, evaluationQuestions: true, evaluationClasses: { include: { class: true } }, evaluationStudents: { include: { student: { include: { user: { include: { person: true } } } } } }, evaluationResults: { include: { student: { include: { user: { include: { person: true } } } } }, orderBy: { evaluatedAt: 'desc' } } } });
    if (!evaluation) return NextResponse.json({ message: 'Evaluation not found' }, { status: 404 });
    return NextResponse.json({ evaluation });
  } catch (error) { return handleApiError(error); }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const id = Number((await params).id);
    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (body.isPublished !== undefined) data.isPublished = Boolean(body.isPublished);
    if (body.isPassed !== undefined) data.isPassed = Boolean(body.isPassed);
    if (body.title !== undefined) data.title = String(body.title).trim();
    const evaluation = await prisma.evaluation.update({ where: { id }, data });
    return NextResponse.json({ evaluation });
  } catch (error) { return handleApiError(error); }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const id = Number((await params).id);
    const evaluation = await prisma.evaluation.findUnique({ where: { id }, select: { id: true, isPassed: true } });
    if (!evaluation) return NextResponse.json({ message: 'Evaluation not found' }, { status: 404 });
    if (evaluation.isPassed) return NextResponse.json({ message: 'Passed evaluations are locked' }, { status: 409 });
    await prisma.$transaction([prisma.evaluationQuestion.deleteMany({ where: { evaluationId: id } }), prisma.evaluationStudent.deleteMany({ where: { evaluationId: id } }), prisma.evaluationClass.deleteMany({ where: { evaluationId: id } }), prisma.evaluation.delete({ where: { id } })]);
    return NextResponse.json({ success: true });
  } catch (error) { return handleApiError(error); }
}
