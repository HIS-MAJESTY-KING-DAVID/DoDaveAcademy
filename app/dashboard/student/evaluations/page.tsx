import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function StudentEvaluationsPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const student = await prisma.student.findUnique({ where: { userId: session.userId }, select: { id: true } });
  if (!student) {
    return <div className="container py-4"><div className="alert alert-warning">Student profile not found.</div></div>;
  }

  const assigned = await prisma.evaluationStudent.findMany({
    where: { studentId: student.id, evaluation: { isPublished: true } },
    include: {
      evaluation: {
        include: {
          category: true,
          _count: { select: { evaluationQuestions: true } },
          evaluationResults: { where: { studentId: student.id }, select: { score: true, evaluatedAt: true } },
        },
      },
    },
    orderBy: { evaluation: { startAt: 'desc' } },
  });

  const evaluations = assigned
    .map((entry) => entry.evaluation)
    .filter((evaluation): evaluation is NonNullable<typeof evaluation> => Boolean(evaluation));
  const now = new Date();
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">My Evaluations</h2>
          <p className="text-muted mb-0">Assigned assessments and completed results.</p>
        </div>
        <Link href="/dashboard/student" className="btn btn-outline-secondary">Back to dashboard</Link>
      </div>

      {evaluations.length === 0 ? (
        <div className="alert alert-info">No evaluations have been assigned to you yet.</div>
      ) : (
        <div className="row g-4">
          {evaluations.map((evaluation) => {
            const result = evaluation.evaluationResults[0];
            const notStarted = evaluation.startAt ? evaluation.startAt > now : false;
            const expired = evaluation.endAt ? evaluation.endAt < now : false;
            const closed = notStarted || expired;
            return (
              <div className="col-lg-6" key={evaluation.id}>
                <article className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <div className="d-flex justify-content-between gap-3 mb-2">
                      <h5 className="card-title mb-0">{evaluation.title}</h5>
                      <span className={`badge ${result ? 'bg-success' : closed ? 'bg-secondary' : 'bg-primary'}`}>
                        {result ? 'Completed' : notStarted ? 'Upcoming' : expired ? 'Closed' : 'Ready'}
                      </span>
                    </div>
                    <p className="text-muted small">{evaluation.category?.name || 'General assessment'}</p>
                    <p className="card-text">{evaluation.description}</p>
                    <div className="small text-muted mb-3">
                      <span className="me-3">{evaluation._count.evaluationQuestions} questions</span>
                      <span>{evaluation.duration} minutes</span>
                    </div>
                    {result ? (
                      <div className="d-flex align-items-center justify-content-between">
                        <strong>Score: {Math.round(result.score)}%</strong>
                        <Link href={`/evaluation/${evaluation.slug}/result`} className="btn btn-outline-primary btn-sm">View result</Link>
                      </div>
                    ) : (
                      <Link
                        href={`/evaluation/${evaluation.slug}/begin`}
                        className={`btn btn-primary ${closed ? 'disabled' : ''}`}
                        aria-disabled={closed}
                      >
                        {notStarted ? 'Not started' : expired ? 'Closed' : 'Begin evaluation'}
                      </Link>
                    )}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
