'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type EvaluationSettings = {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  duration: number;
  startAt: Date | string | null;
  endAt: Date | string | null;
  isPublished: boolean | null;
  isGeneratedRandomQuestions: boolean;
  instructorId: number | null;
  evaluationClasses: { classId: number }[];
  evaluationStudents: { studentId: number }[];
};

function dateValue(value: Date | string | null) {
  return value ? new Date(value).toISOString().slice(0, 16) : '';
}

function parseIds(value: string) {
  return [...new Set(value.split(',').map((item) => Number(item.trim())).filter((item) => Number.isInteger(item) && item > 0))];
}

export default function AdminEvaluationSettings({ evaluation }: { evaluation: EvaluationSettings }) {
  const router = useRouter();
  const [form, setForm] = useState({ title: evaluation.title, description: evaluation.description, categoryId: String(evaluation.categoryId), duration: String(evaluation.duration), startAt: dateValue(evaluation.startAt), endAt: dateValue(evaluation.endAt), isPublished: Boolean(evaluation.isPublished), isGeneratedRandomQuestions: evaluation.isGeneratedRandomQuestions, instructorId: evaluation.instructorId ? String(evaluation.instructorId) : '', classIds: evaluation.evaluationClasses.map((item) => item.classId).join(', '), studentIds: evaluation.evaluationStudents.map((item) => item.studentId).join(', ') });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function save() {
    setSaving(true); setMessage(''); setError('');
    try {
      const response = await fetch(`/api/admin/evaluations/${evaluation.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, categoryId: Number(form.categoryId), duration: Number(form.duration), instructorId: form.instructorId ? Number(form.instructorId) : null, classIds: parseIds(form.classIds), studentIds: parseIds(form.studentIds) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to save evaluation settings');
      setMessage('Evaluation settings saved.'); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to save evaluation settings'); } finally { setSaving(false); }
  }

  return <section className="card border-0 shadow-sm mb-4"><div className="card-header bg-white"><h5 className="mb-0">Evaluation settings</h5></div><div className="card-body"><div className="row g-3"><div className="col-md-8"><label className="form-label">Title</label><input className="form-control" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></div><div className="col-md-4"><label className="form-label">Category ID</label><input type="number" min="1" className="form-control" value={form.categoryId} onChange={(event) => setForm({ ...form, categoryId: event.target.value })} /></div><div className="col-12"><label className="form-label">Description</label><textarea className="form-control" rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></div><div className="col-md-4"><label className="form-label">Duration (minutes)</label><input type="number" min="1" max="1440" className="form-control" value={form.duration} onChange={(event) => setForm({ ...form, duration: event.target.value })} /></div><div className="col-md-4"><label className="form-label">Starts</label><input type="datetime-local" className="form-control" value={form.startAt} onChange={(event) => setForm({ ...form, startAt: event.target.value })} /></div><div className="col-md-4"><label className="form-label">Ends</label><input type="datetime-local" className="form-control" value={form.endAt} onChange={(event) => setForm({ ...form, endAt: event.target.value })} /></div><div className="col-md-6"><label className="form-label">Instructor ID (optional)</label><input type="number" min="1" className="form-control" value={form.instructorId} onChange={(event) => setForm({ ...form, instructorId: event.target.value })} /></div><div className="col-md-6"><label className="form-label">Class IDs (comma-separated)</label><input className="form-control" value={form.classIds} onChange={(event) => setForm({ ...form, classIds: event.target.value })} /></div><div className="col-12"><label className="form-label">Student IDs (comma-separated)</label><input className="form-control" value={form.studentIds} onChange={(event) => setForm({ ...form, studentIds: event.target.value })} /></div><div className="col-12 d-flex flex-wrap gap-4"><label className="form-check"><input className="form-check-input me-2" type="checkbox" checked={form.isPublished} onChange={(event) => setForm({ ...form, isPublished: event.target.checked })} />Published</label><label className="form-check"><input className="form-check-input me-2" type="checkbox" checked={form.isGeneratedRandomQuestions} onChange={(event) => setForm({ ...form, isGeneratedRandomQuestions: event.target.checked })} />Generate random questions</label></div></div>{error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}{message && <div className="alert alert-success mt-3 mb-0">{message}</div>}<button className="btn btn-primary mt-3" disabled={saving} onClick={save}>{saving ? 'Saving…' : 'Save settings'}</button></div></section>;
}
