export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminEvaluationActions from './AdminEvaluationActions';

export default async function AdminEvaluationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const evaluation = await prisma.evaluation.findUnique({ where: { id: Number((await params).id) }, include: { category: true, instructor: { include: { user: { include: { person: true } } } }, evaluationQuestions: { orderBy: { id: 'asc' } }, evaluationClasses: { include: { class: true } }, evaluationStudents: { include: { student: { include: { user: { include: { person: true } } } } } }, evaluationResults: { include: { student: { include: { user: { include: { person: true } } } } }, orderBy: { evaluatedAt: 'desc' } } } });
  if (!evaluation) notFound();
  return (
    <div>
      <div className="d-flex justify-content-between align-items-start mb-4"><div><Link href="/admin/evaluations">← Evaluations</Link><h1 className="h3 mt-2 mb-1">{evaluation.title}</h1><p className="text-muted mb-0">{evaluation.description}</p></div><AdminEvaluationActions id={evaluation.id} isPublished={Boolean(evaluation.isPublished)} isPassed={evaluation.isPassed} /></div>
      <div className="row g-4"><div className="col-lg-7"><section className="card border-0 shadow-sm"><div className="card-header bg-white"><h5 className="mb-0">Questions ({evaluation.evaluationQuestions.length})</h5></div><div className="list-group list-group-flush">{evaluation.evaluationQuestions.map((question, index) => <div className="list-group-item" key={question.id}><strong>{index + 1}. {question.question}</strong><div className="small text-muted">Correct propositions: {question.correctPropositions}</div></div>)}{evaluation.evaluationQuestions.length === 0 && <div className="list-group-item text-muted">No questions configured.</div>}</div></section></div><div className="col-lg-5"><section className="card border-0 shadow-sm mb-4"><div className="card-header bg-white"><h5 className="mb-0">Assignments</h5></div><div className="card-body"><p className="mb-2">Classes: {evaluation.evaluationClasses.length}</p><p className="mb-0">Students: {evaluation.evaluationStudents.length}</p></div></section><section className="card border-0 shadow-sm"><div className="card-header bg-white"><h5 className="mb-0">Results ({evaluation.evaluationResults.length})</h5></div><div className="list-group list-group-flush">{evaluation.evaluationResults.map((result) => <div className="list-group-item d-flex justify-content-between" key={result.id}><span>{result.student?.user?.person?.firstName || result.student?.user?.email || `Student #${result.studentId}`}</span><strong>{Math.round(result.score)}%</strong></div>)}{evaluation.evaluationResults.length === 0 && <div className="list-group-item text-muted">No submissions yet.</div>}</div></section></div></div>
    </div>
  );
}
