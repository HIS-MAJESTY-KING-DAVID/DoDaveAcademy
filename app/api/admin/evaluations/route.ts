import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

async function requireAdmin() {
  const session = await getSession();
  return session?.roles?.includes('ROLE_ADMIN') ? session : null;
}

export async function GET() {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const evaluations = await prisma.evaluation.findMany({ include: { category: true, instructor: { include: { user: { include: { person: true } } } }, _count: { select: { evaluationQuestions: true, evaluationStudents: true, evaluationResults: true } } }, orderBy: { id: 'desc' } });
    return NextResponse.json({ evaluations });
  } catch (error) { return handleApiError(error); }
}
