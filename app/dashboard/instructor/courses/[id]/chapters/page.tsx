'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Chapter {
  id: number;
  title: string;
  slug: string;
  description: string;
  number: number | null;
  lessons: { id: number; title: string; slug: string }[];
  quizzes: { id: number; question: string }[];
}

export default function ChaptersPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [form, setForm] = useState({ title: '', description: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadChapters = async () => {
    try {
      const res = await fetch(`/api/instructor/courses/${courseId}`);
      const data = await res.json();
      if (data.data?.chapters) setChapters(data.data.chapters);
    } catch {
      setError('Failed to load chapters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadChapters(); }, [courseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const res = await fetch(`/api/instructor/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'placeholder', // won't change title
        }),
      });

      if (!res.ok) throw new Error('Failed');

      // Create chapter via direct Prisma API
      const chapterRes = await fetch('/api/instructor/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: parseInt(courseId),
          title: form.title,
          description: form.description,
          number: chapters.length + 1,
        }),
      });

      const data = await chapterRes.json();
      if (!chapterRes.ok) throw new Error(data.message);

      setForm({ title: '', description: '' });
      setShowForm(false);
      setEditingChapter(null);
      loadChapters();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save chapter');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (chapterId: number) => {
    if (!confirm('Delete this chapter and all its lessons?')) return;
    try {
      const res = await fetch(`/api/instructor/chapters/${chapterId}`, { method: 'DELETE' });
      if (res.ok) loadChapters();
    } catch {
      setError('Failed to delete chapter');
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
        <h2 className="mb-0">Chapters & Lessons</h2>
        <div className="d-flex gap-2">
          <button onClick={() => { setEditingChapter(null); setForm({ title: '', description: '' }); setShowForm(!showForm); }} className="btn btn-primary">
            <i className="fas fa-plus me-2"></i>Add Chapter
          </button>
          <Link href={`/dashboard/instructor/courses/${courseId}/edit`} className="btn btn-outline-secondary">Back</Link>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <h5>{editingChapter ? 'Edit Chapter' : 'New Chapter'}</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Chapter Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Description (optional)</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving...' : editingChapter ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline-secondary ms-2">Cancel</button>
            </form>
          </div>
        </div>
      )}

      {chapters.length === 0 ? (
        <div className="alert alert-info">No chapters yet. Click "Add Chapter" to get started.</div>
      ) : (
        <div className="accordion" id="chaptersAccordion">
          {chapters.map((chapter, i) => (
            <div key={chapter.id} className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${i !== 0 ? 'collapsed' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#chapter${chapter.id}`}
                >
                  <strong>{chapter.number ? `${chapter.number}. ` : ''}{chapter.title}</strong>
                  <span className="ms-2 text-muted small">({chapter.lessons.length} lessons, {chapter.quizzes.length} quizzes)</span>
                </button>
              </h2>
              <div id={`chapter${chapter.id}`} className={`accordion-collapse collapse ${i === 0 ? 'show' : ''}`}>
                <div className="accordion-body">
                  {chapter.description && <p className="text-muted">{chapter.description}</p>}

                  <div className="d-flex gap-2 mb-3">
                    <Link
                      href={`/dashboard/instructor/courses/${courseId}/chapters/${chapter.id}/lessons`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i className="fas fa-video me-1"></i>Lessons ({chapter.lessons.length})
                    </Link>
                    <Link
                      href={`/dashboard/instructor/courses/${courseId}/chapters/${chapter.id}/quizzes`}
                      className="btn btn-sm btn-outline-warning"
                    >
                      <i className="fas fa-question-circle me-1"></i>Quizzes ({chapter.quizzes.length})
                    </Link>
                    <button onClick={() => handleDelete(chapter.id)} className="btn btn-sm btn-outline-danger ms-auto">
                      <i className="fas fa-trash me-1"></i>Delete
                    </button>
                  </div>

                  {chapter.lessons.length > 0 && (
                    <div>
                      <h6 className="text-muted text-uppercase small mb-2">Lessons</h6>
                      <ul className="list-group list-group-flush mb-3">
                        {chapter.lessons.map((lesson) => (
                          <li key={lesson.id} className="list-group-item d-flex justify-content-between align-items-center py-2">
                            <span>{lesson.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
