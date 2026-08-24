import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import EvaluationEditor from './EvaluationEditor';

export default async function InstructorEvaluationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect('/login');
  const { id } = await params;
  const evaluationId = Number(id);

  const instructor = await prisma.instructor.findUnique({ where: { userId: session.userId }, select: { id: true } });
  if (!instructor) redirect('/dashboard/student');

  const [evaluation, categories, classes, students] = await Promise.all([
    prisma.evaluation.findFirst({
      where: { id: evaluationId, instructorId: instructor.id },
      include: {
        category: true,
        evaluationQuestions: { orderBy: { id: 'asc' } },
        evaluationStudents: { select: { studentId: true } },
        evaluationClasses: { select: { classId: true } },
        _count: { select: { evaluationResults: true } },
      },
    }),
    prisma.category.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    prisma.class.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    prisma.student.findMany({
      include: { user: { include: { person: true } } },
      orderBy: { id: 'desc' },
      take: 500,
    }),
  ]);

  if (!evaluation) notFound();

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link href="/dashboard/instructor/evaluations" className="text-decoration-none">← Evaluations</Link>
          <h2 className="mt-2 mb-1">{evaluation.title}</h2>
          <p className="text-muted mb-0">{evaluation._count.evaluationResults} submitted result(s)</p>
        </div>
        <Link href={`/evaluation/${evaluation.slug}/result`} className="btn btn-outline-secondary">View results page</Link>
      </div>
      <EvaluationEditor
        evaluation={evaluation}
        categories={categories}
        classes={classes}
        students={students.map((student) => ({
          id: student.id,
          name: `${student.user?.person?.firstName || ''} ${student.user?.person?.lastName || ''}`.trim() || student.user?.email || `Student #${student.id}`,
        }))}
      />
    </div>
  );
}
