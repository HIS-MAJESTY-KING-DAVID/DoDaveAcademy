'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Option = { id: number; name: string };

type Question = { question: string; proposition1: string; proposition2: string; proposition3: string; proposition4: string; correctPropositions: string };
const emptyQuestion: Question = { question: '', proposition1: '', proposition2: '', proposition3: '', proposition4: '', correctPropositions: '1' };

export default function NewEvaluationForm({ categories, classes, students }: { categories: Option[]; classes: Option[]; students: Option[] }) {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', description: '', categoryId: '', duration: '30', startAt: '', endAt: '', isPublished: false, classIds: [] as number[], studentIds: [] as number[] });
  const [question, setQuestion] = useState(emptyQuestion);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function toggle(field: 'classIds' | 'studentIds', id: number) { setForm((current) => ({ ...current, [field]: current[field].includes(id) ? current[field].filter((value) => value !== id) : [...current[field], id] })); }

  async function create() {
    setSaving(true); setError(''); setMessage('');
    try {
      const response = await fetch('/api/instructor/evaluations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to create evaluation');
      if (question.question.trim()) {
        const questionResponse = await fetch(`/api/instructor/evaluations/${data.evaluation.id}/questions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(question) });
        const questionData = await questionResponse.json();
        if (!questionResponse.ok) throw new Error(questionData.message || 'Evaluation created but the first question could not be saved');
      }
      router.push(`/dashboard/instructor/evaluations/${data.evaluation.id}`);
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to create evaluation'); } finally { setSaving(false); }
  }

  return (
    <main className="container py-4"><div className="d-flex justify-content-between align-items-center mb-4"><div><h2>New evaluation</h2><p className="text-muted mb-0">Create an assessment and assign it to classes or individual students.</p></div><button className="btn btn-outline-secondary" onClick={() => router.push('/dashboard/instructor/evaluations')}>Back</button></div>{error && <div className="alert alert-danger">{error}</div>}{message && <div className="alert alert-success">{message}</div>}
      <div className="card border-0 shadow-sm"><div className="card-body"><div className="row g-3"><div className="col-md-8"><label className="form-label">Title</label><input className="form-control" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></div><div className="col-md-4"><label className="form-label">Category</label><select className="form-select" value={form.categoryId} onChange={(event) => setForm({ ...form, categoryId: event.target.value })}><option value="">Select category</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div><div className="col-12"><label className="form-label">Description</label><textarea className="form-control" rows={4} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></div><div className="col-md-4"><label className="form-label">Duration (minutes)</label><input type="number" min={1} className="form-control" value={form.duration} onChange={(event) => setForm({ ...form, duration: event.target.value })} /></div><div className="col-md-4"><label className="form-label">Starts</label><input type="datetime-local" className="form-control" value={form.startAt} onChange={(event) => setForm({ ...form, startAt: event.target.value })} /></div><div className="col-md-4"><label className="form-label">Ends</label><input type="datetime-local" className="form-control" value={form.endAt} onChange={(event) => setForm({ ...form, endAt: event.target.value })} /></div><div className="col-md-6"><label className="form-label">Classes</label><div className="border rounded p-2" style={{ maxHeight: 170, overflowY: 'auto' }}>{classes.map((item) => <label className="d-block" key={item.id}><input className="me-2" type="checkbox" checked={form.classIds.includes(item.id)} onChange={() => toggle('classIds', item.id)} />{item.name}</label>)}</div></div><div className="col-md-6"><label className="form-label">Students</label><div className="border rounded p-2" style={{ maxHeight: 170, overflowY: 'auto' }}>{students.map((item) => <label className="d-block" key={item.id}><input className="me-2" type="checkbox" checked={form.studentIds.includes(item.id)} onChange={() => toggle('studentIds', item.id)} />{item.name}</label>)}</div></div></div></div></div>
      <div className="card border-0 shadow-sm mt-4"><div className="card-body"><h5>First question (optional)</h5><div className="row g-2"><div className="col-12"><input className="form-control" placeholder="Question" value={question.question} onChange={(event) => setQuestion({ ...question, question: event.target.value })} /></div>{(['proposition1', 'proposition2', 'proposition3', 'proposition4'] as const).map((field, index) => <div className="col-md-6" key={field}><input className="form-control" placeholder={`Proposition ${index + 1}`} value={question[field]} onChange={(event) => setQuestion({ ...question, [field]: event.target.value })} /></div>)}<div className="col-12"><label className="form-label small">Correct propositions</label><div className="d-flex gap-3">{[1, 2, 3, 4].map((value) => <label key={value}><input className="me-1" type="checkbox" checked={question.correctPropositions.split(',').includes(String(value))} onChange={() => { const current = question.correctPropositions.split(',').filter(Boolean); setQuestion({ ...question, correctPropositions: (current.includes(String(value)) ? current.filter((item) => item !== String(value)) : [...current, String(value)]).join(',') }); }} />{value}</label>)}</div></div></div></div></div>
      <div className="mt-4"><button className="btn btn-primary" disabled={saving} onClick={create}>{saving ? 'Creating…' : 'Create evaluation'}</button></div>
    </main>
  );
}
