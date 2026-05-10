import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function InstructorEvaluationsPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const instructor = await prisma.instructor.findUnique({
    where: { userId: session.userId },
    include: {
      evaluations: {
        include: {
          category: true,
          _count: { select: { evaluationQuestions: true, evaluationResults: true } },
        },
        orderBy: { startAt: 'desc' },
      },
    },
  });

  if (!instructor) {
    return (
      <div className="container py-4">
        <h2 className="mb-4">Evaluations</h2>
        <div className="alert alert-info">No instructor profile found.</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Evaluations</h2>

      {instructor.evaluations.length === 0 ? (
        <div className="alert alert-info">No evaluations created yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Questions</th>
                <th>Submissions</th>
                <th>Duration</th>
                <th>Period</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {instructor.evaluations.map((evaluation) => (
                <tr key={evaluation.id}>
                  <td>{evaluation.title}</td>
                  <td>{evaluation.category?.name || 'N/A'}</td>
                  <td>{evaluation._count.evaluationQuestions}</td>
                  <td>{evaluation._count.evaluationResults}</td>
                  <td>{evaluation.duration} min</td>
                  <td>
                    {evaluation.startAt ? new Date(evaluation.startAt).toLocaleDateString() : 'N/A'}
                    {' - '}
                    {evaluation.endAt ? new Date(evaluation.endAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>
                    {evaluation.isPublished ? (
                      <span className="badge bg-success">Published</span>
                    ) : (
                      <span className="badge bg-secondary">Draft</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
