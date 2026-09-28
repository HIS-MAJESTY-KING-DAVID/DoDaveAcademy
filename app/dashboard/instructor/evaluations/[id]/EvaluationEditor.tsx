'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type Question = {
  id: number;
  question: string;
  proposition1: string;
  proposition2: string;
  proposition3: string | null;
  proposition4: string | null;
  correctPropositions: string;
};

type Evaluation = {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  duration: number;
  startAt: Date | null;
  endAt: Date | null;
  isPublished: boolean | null;
  isPassed: boolean;
  isGeneratedRandomQuestions: boolean;
  evaluationQuestions: Question[];
  evaluationStudents: { studentId: number }[];
  evaluationClasses: { classId: number }[];
};

type Option = { id: number; name: string };
type StudentOption = { id: number; name: string };

type QuestionDraft = Omit<Question, 'id'>;

const emptyQuestion: QuestionDraft = {
  question: '',
  proposition1: '',
  proposition2: '',
  proposition3: '',
  proposition4: '',
  correctPropositions: '1',
};

function dateValue(value: Date | null) {
  return value ? new Date(value).toISOString().slice(0, 16) : '';
}

export default function EvaluationEditor({
  evaluation,
  categories,
  classes,
  students,
}: {
  evaluation: Evaluation;
  categories: Option[];
  classes: Option[];
  students: StudentOption[];
}) {
  const router = useRouter();
  const locked = evaluation.isPassed;
  const [metadata, setMetadata] = useState({
    title: evaluation.title,
    description: evaluation.description,
    categoryId: String(evaluation.categoryId),
    duration: String(evaluation.duration),
    startAt: dateValue(evaluation.startAt),
    endAt: dateValue(evaluation.endAt),
    isPublished: Boolean(evaluation.isPublished),
    classIds: evaluation.evaluationClasses.map((entry) => entry.classId),
    studentIds: evaluation.evaluationStudents.map((entry) => entry.studentId),
  });
  const [questions, setQuestions] = useState<Question[]>(evaluation.evaluationQuestions);
  const [draft, setDraft] = useState<QuestionDraft>(emptyQuestion);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const selectedStudentCount = metadata.studentIds.length;
  const selectedClassCount = metadata.classIds.length;
  const sortedQuestions = useMemo(() => [...questions].sort((a, b) => a.id - b.id), [questions]);

  async function saveMetadata() {
    setSaving(true); setError(''); setMessage('');
    try {
      const response = await fetch(`/api/instructor/evaluations/${evaluation.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metadata),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to save evaluation');
      setMessage('Evaluation details saved.');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save evaluation');
    } finally { setSaving(false); }
  }

  async function saveQuestion() {
    setSaving(true); setError(''); setMessage('');
    try {
      const endpoint = editingId
        ? `/api/instructor/evaluations/${evaluation.id}/questions/${editingId}`
        : `/api/instructor/evaluations/${evaluation.id}/questions`;
      const response = await fetch(endpoint, {
        method: editingId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to save question');
      if (editingId) setQuestions((current) => current.map((question) => question.id === editingId ? data.question : question));
      else setQuestions((current) => [...current, data.question]);
      setDraft(emptyQuestion); setEditingId(null); setMessage('Question saved.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save question');
    } finally { setSaving(false); }
  }

  async function deleteQuestion(id: number) {
    if (!window.confirm('Delete this question?')) return;
    setSaving(true); setError('');
    try {
      const response = await fetch(`/api/instructor/evaluations/${evaluation.id}/questions/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to delete question');
      setQuestions((current) => current.filter((question) => question.id !== id));
      setMessage('Question deleted.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete question');
    } finally { setSaving(false); }
  }

  async function deleteEvaluation() {
    if (!window.confirm('Delete this evaluation and its questions?')) return;
    setSaving(true); setError('');
    try {
      const response = await fetch(`/api/instructor/evaluations/${evaluation.id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to delete evaluation');
      router.push('/dashboard/instructor/evaluations');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete evaluation');
      setSaving(false);
    }
  }

  function toggleNumber(field: 'classIds' | 'studentIds', id: number) {
    setMetadata((current) => ({
      ...current,
      [field]: current[field].includes(id) ? current[field].filter((value) => value !== id) : [...current[field], id],
    }));
  }

  return (
    <div>
      {locked && <div className="alert alert-warning">This evaluation is passed and locked against structural changes.</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <section className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white"><h5 className="mb-0">Evaluation settings</h5></div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8"><label className="form-label">Title</label><input className="form-control" value={metadata.title} disabled={locked} onChange={(event) => setMetadata({ ...metadata, title: event.target.value })} /></div>
            <div className="col-md-4"><label className="form-label">Category</label><select className="form-select" value={metadata.categoryId} disabled={locked} onChange={(event) => setMetadata({ ...metadata, categoryId: event.target.value })}>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div>
            <div className="col-12"><label className="form-label">Description</label><textarea className="form-control" rows={3} value={metadata.description} disabled={locked} onChange={(event) => setMetadata({ ...metadata, description: event.target.value })} /></div>
            <div className="col-md-4"><label className="form-label">Duration (minutes)</label><input type="number" min={1} className="form-control" value={metadata.duration} disabled={locked} onChange={(event) => setMetadata({ ...metadata, duration: event.target.value })} /></div>
            <div className="col-md-4"><label className="form-label">Starts</label><input type="datetime-local" className="form-control" value={metadata.startAt} disabled={locked} onChange={(event) => setMetadata({ ...metadata, startAt: event.target.value })} /></div>
            <div className="col-md-4"><label className="form-label">Ends</label><input type="datetime-local" className="form-control" value={metadata.endAt} disabled={locked} onChange={(event) => setMetadata({ ...metadata, endAt: event.target.value })} /></div>
            <div className="col-12"><label className="form-check"><input className="form-check-input me-2" type="checkbox" checked={metadata.isPublished} disabled={locked} onChange={(event) => setMetadata({ ...metadata, isPublished: event.target.checked })} />Publish for assigned students</label></div>
            <div className="col-md-6"><label className="form-label">Assign classes ({selectedClassCount})</label><div className="border rounded p-2" style={{ maxHeight: 160, overflowY: 'auto' }}>{classes.map((item) => <label className="d-block" key={item.id}><input type="checkbox" className="me-2" checked={metadata.classIds.includes(item.id)} disabled={locked} onChange={() => toggleNumber('classIds', item.id)} />{item.name}</label>)}</div></div>
            <div className="col-md-6"><label className="form-label">Assign students ({selectedStudentCount})</label><div className="border rounded p-2" style={{ maxHeight: 160, overflowY: 'auto' }}>{students.map((item) => <label className="d-block" key={item.id}><input type="checkbox" className="me-2" checked={metadata.studentIds.includes(item.id)} disabled={locked} onChange={() => toggleNumber('studentIds', item.id)} />{item.name}</label>)}</div></div>
          </div>
          <div className="d-flex justify-content-between mt-4"><button className="btn btn-primary" disabled={locked || saving} onClick={saveMetadata}>{saving ? 'Saving…' : 'Save settings'}</button><button className="btn btn-outline-danger" disabled={locked || saving} onClick={deleteEvaluation}>Delete evaluation</button></div>
        </div>
      </section>

      <section className="card border-0 shadow-sm">
        <div className="card-header bg-white"><h5 className="mb-0">Questions ({sortedQuestions.length})</h5></div>
        <div className="card-body">
          {sortedQuestions.length === 0 && <div className="alert alert-info">Add at least one question before publishing.</div>}
          <div className="list-group mb-4">{sortedQuestions.map((question, index) => <div className="list-group-item" key={question.id}><div className="d-flex justify-content-between gap-3"><div><strong>{index + 1}. {question.question}</strong><div className="small text-muted">Correct: {question.correctPropositions}</div></div><div className="btn-group btn-group-sm"><button className="btn btn-outline-primary" disabled={locked} onClick={() => { setEditingId(question.id); setDraft(question); }}>Edit</button><button className="btn btn-outline-danger" disabled={locked || saving} onClick={() => deleteQuestion(question.id)}>Delete</button></div></div></div>)}</div>
          <div className="border rounded p-3 bg-light"><h6>{editingId ? 'Edit question' : 'Add question'}</h6><div className="row g-2"><div className="col-12"><input className="form-control" placeholder="Question" value={draft.question} disabled={locked} onChange={(event) => setDraft({ ...draft, question: event.target.value })} /></div>{(['proposition1', 'proposition2', 'proposition3', 'proposition4'] as const).map((field, index) => <div className="col-md-6" key={field}><input className="form-control" placeholder={`Proposition ${index + 1}${index > 1 ? ' (optional)' : ''}`} value={draft[field] || ''} disabled={locked} onChange={(event) => setDraft({ ...draft, [field]: event.target.value })} /></div>)}<div className="col-12"><label className="form-label small mb-1">Correct propositions</label><div className="d-flex gap-3">{[1, 2, 3, 4].map((value) => <label key={value}><input type="checkbox" className="me-1" checked={draft.correctPropositions.split(',').includes(String(value))} disabled={locked || (value > 2 && !draft[`proposition${value}` as 'proposition3' | 'proposition4'])} onChange={() => { const current = draft.correctPropositions.split(',').filter(Boolean); const next = current.includes(String(value)) ? current.filter((item) => item !== String(value)) : [...current, String(value)]; setDraft({ ...draft, correctPropositions: next.join(',') }); }} />{value}</label>)}</div></div></div><div className="d-flex gap-2 mt-3"><button className="btn btn-primary" disabled={locked || saving} onClick={saveQuestion}>{saving ? 'Saving…' : editingId ? 'Update question' : 'Add question'}</button>{editingId && <button className="btn btn-outline-secondary" onClick={() => { setEditingId(null); setDraft(emptyQuestion); }}>Cancel</button>}</div></div>
        </div>
      </section>
    </div>
  );
}
