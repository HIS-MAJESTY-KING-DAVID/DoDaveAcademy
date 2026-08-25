'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Category = { id: number; name: string };

export default function AdminEvaluationCreateForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', description: '', categoryId: categories[0] ? String(categories[0].id) : '', duration: '60', startAt: '', endAt: '', instructorId: '', classIds: '', studentIds: '', isPublished: false, isGeneratedRandomQuestions: false });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function ids(value: string) { return [...new Set(value.split(',').map((item) => Number(item.trim())).filter((item) => Number.isInteger(item) && item > 0))]; }

  async function create() {
    setSaving(true); setError('');
    try {
      const response = await fetch('/api/admin/evaluations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, categoryId: Number(form.categoryId), duration: Number(form.duration), instructorId: form.instructorId ? Number(form.instructorId) : null, classIds: ids(form.classIds), studentIds: ids(form.studentIds) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to create evaluation');
      router.push(`/admin/evaluations/${data.evaluation.id}`);
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to create evaluation'); setSaving(false); }
  }

  return <div className="card border-0 shadow-sm"><div className="card-body"><div className="row g-3"><div className="col-md-8"><label className="form-label">Title</label><input className="form-control" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></div><div className="col-md-4"><label className="form-label">Category</label><select className="form-select" value={form.categoryId} onChange={(event) => setForm({ ...form, categoryId: event.target.value })}>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div><div className="col-12"><label className="form-label">Description</label><textarea className="form-control" rows={4} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></div><div className="col-md-4"><label className="form-label">Duration (minutes)</label><input type="number" min="1" max="1440" className="form-control" value={form.duration} onChange={(event) => setForm({ ...form, duration: event.target.value })} /></div><div className="col-md-4"><label className="form-label">Starts</label><input type="datetime-local" className="form-control" value={form.startAt} onChange={(event) => setForm({ ...form, startAt: event.target.value })} /></div><div className="col-md-4"><label className="form-label">Ends</label><input type="datetime-local" className="form-control" value={form.endAt} onChange={(event) => setForm({ ...form, endAt: event.target.value })} /></div><div className="col-md-6"><label className="form-label">Instructor ID (optional)</label><input type="number" min="1" className="form-control" value={form.instructorId} onChange={(event) => setForm({ ...form, instructorId: event.target.value })} /></div><div className="col-md-6"><label className="form-label">Class IDs (comma-separated)</label><input className="form-control" value={form.classIds} onChange={(event) => setForm({ ...form, classIds: event.target.value })} /></div><div className="col-12"><label className="form-label">Student IDs (comma-separated)</label><input className="form-control" value={form.studentIds} onChange={(event) => setForm({ ...form, studentIds: event.target.value })} /></div><div className="col-12 d-flex flex-wrap gap-4"><label className="form-check"><input className="form-check-input me-2" type="checkbox" checked={form.isPublished} onChange={(event) => setForm({ ...form, isPublished: event.target.checked })} />Published</label><label className="form-check"><input className="form-check-input me-2" type="checkbox" checked={form.isGeneratedRandomQuestions} onChange={(event) => setForm({ ...form, isGeneratedRandomQuestions: event.target.checked })} />Generate random questions</label></div></div>{error && <div className="alert alert-danger mt-3">{error}</div>}<button className="btn btn-primary mt-3" disabled={saving || !categories.length} onClick={create}>{saving ? 'Creating…' : 'Create evaluation'}</button></div></div>;
}
