'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Lesson {
  id: number;
  title: string;
  slug: string;
  content: string;
  videoLink: string | null;
  number: number | null;
  poster: string | null;
}

export default function LessonsPage() {
  const params = useParams();
  const courseId = params.id as string;
  const chapterId = params.chapterId as string;

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Lesson | null>(null);
  const [form, setForm] = useState({ title: '', content: '', videoLink: '', poster: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadLessons = async () => {
    try {
      const res = await fetch(`/api/instructor/courses/${courseId}`);
      const data = await res.json();
      const chapter = data.data?.chapters?.find((c: { id: number }) => c.id === parseInt(chapterId));
      if (chapter) setLessons(chapter.lessons || []);
    } catch {
      setError('Failed to load lessons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadLessons(); }, [courseId, chapterId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const method = editing ? 'PUT' : 'POST';
      const url = editing
        ? `/api/instructor/lessons/${editing.id}`
        : '/api/instructor/lessons';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          chapterId: parseInt(chapterId),
          courseId: parseInt(courseId),
          number: editing ? undefined : lessons.length + 1,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setForm({ title: '', content: '', videoLink: '', poster: '' });
      setShowForm(false);
      setEditing(null);
      loadLessons();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save lesson');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (lesson: Lesson) => {
    setEditing(lesson);
    setForm({
      title: lesson.title,
      content: lesson.content,
      videoLink: lesson.videoLink || '',
      poster: lesson.poster || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (lessonId: number) => {
    if (!confirm('Delete this lesson?')) return;
    try {
      const res = await fetch(`/api/instructor/lessons/${lessonId}`, { method: 'DELETE' });
      if (res.ok) loadLessons();
    } catch {
      setError('Failed to delete lesson');
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Lessons</h2>
        <div className="d-flex gap-2">
          <button
            onClick={() => { setEditing(null); setForm({ title: '', content: '', videoLink: '', poster: '' }); setShowForm(!showForm); }}
            className="btn btn-primary"
          >
            <i className="fas fa-plus me-2"></i>Add Lesson
          </button>
          <Link href={`/dashboard/instructor/courses/${courseId}/chapters`} className="btn btn-outline-secondary">Back</Link>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <h5>{editing ? 'Edit Lesson' : 'New Lesson'}</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Lesson Title</label>
                <input type="text" className="form-control" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Content (HTML or Markdown)</label>
                <textarea className="form-control" rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Video Link (URL)</label>
                  <input type="url" className="form-control" placeholder="https://..." value={form.videoLink} onChange={(e) => setForm({ ...form, videoLink: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Poster Image (URL)</label>
                  <input type="url" className="form-control" placeholder="https://..." value={form.poster} onChange={(e) => setForm({ ...form, poster: e.target.value })} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline-secondary ms-2">Cancel</button>
            </form>
          </div>
        </div>
      )}

      {lessons.length === 0 ? (
        <div className="alert alert-info">No lessons yet. Click "Add Lesson" to get started.</div>
      ) : (
        <div className="list-group">
          {lessons.map((lesson, i) => (
            <div key={lesson.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <div>
                <strong>{lesson.number ? `${lesson.number}. ` : ''}{lesson.title}</strong>
                {lesson.videoLink && <span className="ms-2 badge bg-info"><i className="fas fa-video me-1"></i>Video</span>}
              </div>
              <div className="d-flex gap-2">
                <button onClick={() => handleEdit(lesson)} className="btn btn-sm btn-outline-primary">
                  <i className="fas fa-edit"></i>
                </button>
                <button onClick={() => handleDelete(lesson.id)} className="btn btn-sm btn-outline-danger">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
