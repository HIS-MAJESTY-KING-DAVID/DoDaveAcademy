export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function AdminEvaluationsPage() {
  const evaluations = await prisma.evaluation.findMany({ include: { category: true, instructor: { include: { user: { include: { person: true } } } }, _count: { select: { evaluationQuestions: true, evaluationStudents: true, evaluationResults: true } } }, orderBy: { id: 'desc' } });
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4"><div><h1 className="h3 mb-1">Evaluations</h1><p className="text-muted mb-0">Review assessments, assignments, questions, and results.</p></div><div className="d-flex gap-2"><Link href="/admin/evaluations/new" className="btn btn-primary">Create evaluation</Link><Link href="/admin" className="btn btn-outline-secondary">Back to admin</Link></div></div>
      <div className="table-responsive bg-white rounded shadow-sm"><table className="table table-hover align-middle mb-0"><thead><tr><th>Title</th><th>Instructor</th><th>Questions</th><th>Assigned</th><th>Results</th><th>State</th><th></th></tr></thead><tbody>{evaluations.map((evaluation) => <tr key={evaluation.id}><td><strong>{evaluation.title}</strong><div className="small text-muted">{evaluation.category?.name || 'No category'}</div></td><td>{`${evaluation.instructor?.user?.person?.firstName || ''} ${evaluation.instructor?.user?.person?.lastName || ''}`.trim() || 'N/A'}</td><td>{evaluation._count.evaluationQuestions}</td><td>{evaluation._count.evaluationStudents}</td><td>{evaluation._count.evaluationResults}</td><td>{evaluation.isPublished ? <span className="badge bg-success">Published</span> : <span className="badge bg-secondary">Draft</span>}</td><td><Link href={`/admin/evaluations/${evaluation.id}`} className="btn btn-sm btn-outline-primary">Manage</Link></td></tr>)}</tbody></table></div>
      {evaluations.length === 0 && <div className="alert alert-info mt-3">No evaluations found.</div>}
    </div>
  );
}
