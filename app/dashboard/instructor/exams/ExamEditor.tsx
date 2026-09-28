'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Option = { id: number; name: string };
type Exam = { id: number; reference: string; title: string; subject: string; description: string; duration: string; language: string; correction: string | null; imageFile: string | null; categoryId: number | null; classId: number | null; isPublished: boolean; isValidated: boolean | null };

export default function ExamEditor({ exam, categories, classes }: { exam?: Exam; categories: Option[]; classes: Option[] }) {
  const router = useRouter();
  const editing = Boolean(exam);
  const [form, setForm] = useState({
    title: exam?.title || '', subject: exam?.subject || '', description: exam?.description || '', duration: exam?.duration || '', language: exam?.language || 'fr', correction: exam?.correction || '', imageFile: exam?.imageFile || '', categoryId: exam?.categoryId ? String(exam.categoryId) : '', classId: exam?.classId ? String(exam.classId) : '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function update(field: keyof typeof form, value: string) { setForm((current) => ({ ...current, [field]: value })); }

  async function save() {
    setSaving(true); setError(''); setMessage('');
    try {
      const endpoint = editing ? `/api/instructor/exams/${exam!.reference}` : '/api/instructor/exams';
      const response = await fetch(endpoint, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to save exam');
      if (editing) { setMessage('Exam saved.'); router.refresh(); } else router.push(`/dashboard/instructor/exams/${data.exam.reference}/edit`);
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to save exam'); } finally { setSaving(false); }
  }

  async function publish() {
    if (!exam) return;
    setSaving(true); setError('');
    try {
      const response = await fetch(`/api/instructor/exams/${exam.reference}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !exam.isPublished }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to change publication state');
      setMessage(data.exam.isPublished ? 'Exam published.' : 'Exam unpublished.'); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to change publication state'); } finally { setSaving(false); }
  }

  async function remove() {
    if (!exam || !window.confirm('Delete this exam?')) return;
    setSaving(true); setError('');
    try {
      const response = await fetch(`/api/instructor/exams/${exam.reference}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to delete exam');
      router.push('/dashboard/instructor/exams');
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to delete exam'); setSaving(false); }
  }

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4"><div><h2>{editing ? 'Edit exam' : 'New exam'}</h2><p className="text-muted mb-0">Create and submit a DoDave Academy exam for admin validation.</p></div><button className="btn btn-outline-secondary" onClick={() => router.push('/dashboard/instructor/exams')}>Back</button></div>
      {error && <div className="alert alert-danger">{error}</div>}{message && <div className="alert alert-success">{message}</div>}
      <div className="card border-0 shadow-sm"><div className="card-body"><div className="row g-3">
        <div className="col-md-8"><label className="form-label">Title</label><input className="form-control" value={form.title} onChange={(event) => update('title', event.target.value)} /></div>
        <div className="col-md-4"><label className="form-label">Subject</label><input className="form-control" value={form.subject} onChange={(event) => update('subject', event.target.value)} /></div>
        <div className="col-12"><label className="form-label">Description</label><textarea className="form-control" rows={5} value={form.description} onChange={(event) => update('description', event.target.value)} /></div>
        <div className="col-md-3"><label className="form-label">Duration</label><input className="form-control" value={form.duration} placeholder="90 min" onChange={(event) => update('duration', event.target.value)} /></div>
        <div className="col-md-3"><label className="form-label">Language</label><select className="form-select" value={form.language} onChange={(event) => update('language', event.target.value)}><option value="fr">French</option><option value="en">English</option></select></div>
        <div className="col-md-3"><label className="form-label">Category</label><select className="form-select" value={form.categoryId} onChange={(event) => update('categoryId', event.target.value)}><option value="">Select category</option>{categories.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}</select></div>
        <div className="col-md-3"><label className="form-label">Class</label><select className="form-select" value={form.classId} onChange={(event) => update('classId', event.target.value)}><option value="">Select class</option>{classes.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}</select></div>
        <div className="col-12"><label className="form-label">Correction / answer key</label><textarea className="form-control" rows={4} value={form.correction} onChange={(event) => update('correction', event.target.value)} /></div>
        <div className="col-md-6"><label className="form-label">Uploaded subject file name</label><input className="form-control" value={form.imageFile} onChange={(event) => update('imageFile', event.target.value)} /></div>
      </div><div className="d-flex flex-wrap gap-2 mt-4"><button className="btn btn-primary" disabled={saving} onClick={save}>{saving ? 'Saving…' : editing ? 'Save changes' : 'Create draft'}</button>{editing && <><button className="btn btn-outline-success" disabled={saving || !exam?.isValidated} onClick={publish}>{exam?.isPublished ? 'Unpublish' : 'Publish exam'}</button><button className="btn btn-outline-danger ms-auto" disabled={saving} onClick={remove}>Delete</button></>}</div>{editing && <div className="small text-muted mt-3">Reference: {exam?.reference} · Validation: {exam?.isValidated ? 'approved' : 'pending administrator approval'}</div>}</div></div>
    </main>
  );
}
