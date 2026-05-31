import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import EvaluationForm from './EvaluationForm';

export const dynamic = 'force-dynamic';

export default async function EvaluationBeginPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getSession();
  if (!session) redirect('/login');

  const { slug } = await params;

  const student = await prisma.student.findUnique({ where: { userId: session.userId } });
  if (!student) redirect('/dashboard/student');

  const evaluation = await prisma.evaluation.findFirst({
    where: { slug },
    include: { evaluationQuestions: true, evaluationStudents: true },
  });

  if (!evaluation || !evaluation.isPublished) {
    redirect('/dashboard/student');
  }

  const isAssigned = evaluation.evaluationStudents.some((es) => es.studentId === student.id);
  if (!isAssigned) {
    redirect('/dashboard/student');
  }

  const existingResult = await prisma.evaluationResult.findFirst({
    where: { evaluationId: evaluation.id, studentId: student.id },
  });

  if (existingResult) {
    redirect(`/evaluation/${slug}/result`);
  }

  if (evaluation.startAt && new Date(evaluation.startAt) > new Date()) {
    redirect('/dashboard/student');
  }

  if (evaluation.endAt && new Date(evaluation.endAt) < new Date()) {
    redirect('/dashboard/student');
  }

  return <EvaluationForm evaluation={evaluation} studentId={student.id} />;
}
