import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function InstructorEvaluationsPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const instructor = await prisma.instructor.findUnique({
    where: { userId: session.userId },
    include: {
      evaluations: {
        include: {
          category: true,
          _count: { select: { evaluationQuestions: true, evaluationResults: true, evaluationStudents: true } },
        },
        orderBy: { id: 'desc' },
      },
    },
  });

  if (!instructor) {
    return <div className="container py-4"><div className="alert alert-warning">Instructor profile not found.</div></div>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h2 className="mb-1">Evaluations</h2>
          <p className="text-muted mb-0">Create assessments, maintain questions, and review submissions.</p>
        </div>
        <div className="d-flex gap-2">
          <Link href="/dashboard/instructor" className="btn btn-outline-secondary">Back</Link>
          <Link href="/dashboard/instructor/evaluations/new" className="btn btn-primary">New evaluation</Link>
        </div>
      </div>

      {instructor.evaluations.length === 0 ? (
        <div className="alert alert-info">No evaluations created yet. Create the first DoDave Academy assessment.</div>
      ) : (
        <div className="table-responsive bg-white rounded shadow-sm">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Questions</th>
                <th>Assigned</th>
                <th>Submissions</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {instructor.evaluations.map((evaluation) => (
                <tr key={evaluation.id}>
                  <td>
                    <div className="fw-semibold">{evaluation.title}</div>
                    <small className="text-muted">{evaluation.duration} minutes</small>
                  </td>
                  <td>{evaluation.category?.name || 'N/A'}</td>
                  <td>{evaluation._count.evaluationQuestions}</td>
                  <td>{evaluation._count.evaluationStudents}</td>
                  <td>{evaluation._count.evaluationResults}</td>
                  <td>{evaluation.isPublished ? <span className="badge bg-success">Published</span> : <span className="badge bg-secondary">Draft</span>}</td>
                  <td className="text-end">
                    <div className="btn-group btn-group-sm">
                      <Link href={`/dashboard/instructor/evaluations/${evaluation.id}`} className="btn btn-outline-primary">Manage</Link>
                      <Link href={`/evaluation/${evaluation.slug}/result`} className="btn btn-outline-secondary">Results</Link>
                    </div>
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
