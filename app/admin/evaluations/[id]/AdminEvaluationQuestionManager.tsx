'use client';

import { useState } from 'react';
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

type Draft = Omit<Question, 'id'>;

const emptyDraft: Draft = { question: '', proposition1: '', proposition2: '', proposition3: '', proposition4: '', correctPropositions: '1' };

export default function AdminEvaluationQuestionManager({ evaluationId, initialQuestions, locked }: { evaluationId: number; initialQuestions: Question[]; locked: boolean }) {
  const router = useRouter();
  const [questions, setQuestions] = useState(initialQuestions);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function edit(question: Question) {
    setEditingId(question.id);
    setDraft(question);
    setMessage('');
    setError('');
  }

  function toggleCorrect(value: number) {
    const current = draft.correctPropositions.split(',').filter(Boolean);
    const next = current.includes(String(value)) ? current.filter((item) => item !== String(value)) : [...current, String(value)];
    setDraft({ ...draft, correctPropositions: next.join(',') });
  }

  async function saveQuestion() {
    setSaving(true); setError(''); setMessage('');
    try {
      const endpoint = editingId ? `/api/admin/evaluations/${evaluationId}/questions/${editingId}` : `/api/admin/evaluations/${evaluationId}/questions`;
      const response = await fetch(endpoint, { method: editingId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to save question');
      setQuestions((current) => editingId ? current.map((item) => item.id === editingId ? data.question : item) : [...current, data.question]);
      setDraft(emptyDraft); setEditingId(null); setMessage('Question saved.'); router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save question');
    } finally { setSaving(false); }
  }

  async function removeQuestion(id: number) {
    if (!window.confirm('Delete this question?')) return;
    setSaving(true); setError(''); setMessage('');
    try {
      const response = await fetch(`/api/admin/evaluations/${evaluationId}/questions/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to delete question');
      setQuestions((current) => current.filter((item) => item.id !== id)); setMessage('Question deleted.'); router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete question');
    } finally { setSaving(false); }
  }

  return <section className="card border-0 shadow-sm mt-4"><div className="card-header bg-white"><h5 className="mb-0">Questions ({questions.length})</h5></div><div className="card-body">
    {locked && <div className="alert alert-warning">This evaluation is passed and locked against structural changes.</div>}
    {error && <div className="alert alert-danger">{error}</div>}
    {message && <div className="alert alert-success">{message}</div>}
    <div className="list-group mb-4">{questions.map((question, index) => <div className="list-group-item" key={question.id}><div className="d-flex justify-content-between gap-3"><div><strong>{index + 1}. {question.question}</strong><div className="small text-muted">Correct propositions: {question.correctPropositions}</div></div><div className="btn-group btn-group-sm"><button className="btn btn-outline-primary" disabled={locked || saving} onClick={() => edit(question)}>Edit</button><button className="btn btn-outline-danger" disabled={locked || saving} onClick={() => removeQuestion(question.id)}>Delete</button></div></div></div>)}{questions.length === 0 && <div className="list-group-item text-muted">No questions configured.</div>}</div>
    <div className="border rounded p-3 bg-light"><h6>{editingId ? 'Edit question' : 'Add question'}</h6><div className="row g-2"><div className="col-12"><input className="form-control" placeholder="Question" value={draft.question} disabled={locked} onChange={(event) => setDraft({ ...draft, question: event.target.value })} /></div>{(['proposition1', 'proposition2', 'proposition3', 'proposition4'] as const).map((field, index) => <div className="col-md-6" key={field}><input className="form-control" placeholder={`Proposition ${index + 1}${index > 1 ? ' (optional)' : ''}`} value={draft[field] || ''} disabled={locked} onChange={(event) => setDraft({ ...draft, [field]: event.target.value })} /></div>)}<div className="col-12"><label className="form-label small mb-1">Correct propositions</label><div className="d-flex gap-3">{[1, 2, 3, 4].map((value) => <label key={value}><input type="checkbox" className="me-1" checked={draft.correctPropositions.split(',').includes(String(value))} disabled={locked || (value > 2 && !draft[`proposition${value}` as 'proposition3' | 'proposition4'])} onChange={() => toggleCorrect(value)} />{value}</label>)}</div></div></div><div className="d-flex gap-2 mt-3"><button className="btn btn-primary" disabled={locked || saving} onClick={saveQuestion}>{saving ? 'Saving…' : editingId ? 'Update question' : 'Add question'}</button>{editingId && <button className="btn btn-outline-secondary" disabled={saving} onClick={() => { setEditingId(null); setDraft(emptyDraft); }}>Cancel</button>}</div></div>
  </div></section>;
}
