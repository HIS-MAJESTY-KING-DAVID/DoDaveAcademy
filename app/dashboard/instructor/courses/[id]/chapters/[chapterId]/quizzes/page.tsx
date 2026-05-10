'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Proposition {
  id?: number;
  content: string;
  isTrue: boolean;
}

interface Quiz {
  id: number;
  question: string;
  reference: string;
  propositions: Proposition[];
  correctPropositions: string;
}

export default function QuizzesPage() {
  const params = useParams();
  const courseId = params.id as string;
  const chapterId = params.chapterId as string;

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Quiz | null>(null);
  const [form, setForm] = useState({
    question: '',
    propositions: [
      { content: '', isTrue: false },
      { content: '', isTrue: false },
      { content: '', isTrue: false },
      { content: '', isTrue: false },
    ] as Proposition[],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadQuizzes = async () => {
    try {
      const res = await fetch(`/api/instructor/courses/${courseId}`);
      const data = await res.json();
      const chapter = data.data?.chapters?.find((c: { id: number }) => c.id === parseInt(chapterId));
      if (chapter) setQuizzes(chapter.quizzes || []);
    } catch {
      setError('Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadQuizzes(); }, [courseId, chapterId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const correctProp = form.propositions.find((p) => p.isTrue);
    if (!correctProp) {
      setError('Please mark at least one correct answer');
      setSaving(false);
      return;
    }

    try {
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `/api/instructor/quizzes/${editing.id}` : '/api/instructor/quizzes';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: form.question,
          chapterId: parseInt(chapterId),
          courseId: parseInt(courseId),
          propositions: form.propositions.filter((p) => p.content.trim()),
          correctPropositions: correctProp.content,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setForm({
        question: '',
        propositions: [
          { content: '', isTrue: false },
          { content: '', isTrue: false },
          { content: '', isTrue: false },
          { content: '', isTrue: false },
        ],
      });
      setShowForm(false);
      setEditing(null);
      loadQuizzes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save quiz');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (quiz: Quiz) => {
    const existingProps = quiz.propositions.length > 0
      ? quiz.propositions
      : [
          { content: quiz.correctPropositions || '', isTrue: true },
          ...(quiz as unknown as { proposition1?: string; proposition2?: string; proposition3?: string; proposition4?: string }).proposition1
            ? [
                { content: (quiz as unknown as Record<string, string>).proposition1 || '', isTrue: false },
                { content: (quiz as unknown as Record<string, string>).proposition2 || '', isTrue: false },
                { content: (quiz as unknown as Record<string, string>).proposition3 || '', isTrue: false },
                { content: (quiz as unknown as Record<string, string>).proposition4 || '', isTrue: false },
              ].filter((p) => p.content)
            : [],
        ];

    setEditing(quiz);
    setForm({ question: quiz.question, propositions: existingProps });
    setShowForm(true);
  };

  const handleDelete = async (quizId: number) => {
    if (!confirm('Delete this quiz question?')) return;
    try {
      const res = await fetch(`/api/instructor/quizzes/${quizId}`, { method: 'DELETE' });
      if (res.ok) loadQuizzes();
    } catch {
      setError('Failed to delete quiz');
    }
  };

  const updateProposition = (index: number, field: 'content' | 'isTrue', value: string | boolean) => {
    const updated = [...form.propositions];
    if (field === 'isTrue') {
      updated.forEach((p, i) => { p.isTrue = i === index; });
    } else {
      updated[index].content = value as string;
    }
    setForm({ ...form, propositions: updated });
  };

  const addProposition = () => {
    setForm({ ...form, propositions: [...form.propositions, { content: '', isTrue: false }] });
  };

  const removeProposition = (index: number) => {
    if (form.propositions.length <= 2) return;
    setForm({ ...form, propositions: form.propositions.filter((_, i) => i !== index) });
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
        <h2 className="mb-0">Quizzes</h2>
        <div className="d-flex gap-2">
          <button
            onClick={() => { setEditing(null); setForm({
              question: '',
              propositions: [
                { content: '', isTrue: false },
                { content: '', isTrue: false },
                { content: '', isTrue: false },
                { content: '', isTrue: false },
              ],
            }); setShowForm(!showForm); }}
            className="btn btn-primary"
          >
            <i className="fas fa-plus me-2"></i>Add Question
          </button>
          <Link href={`/dashboard/instructor/courses/${courseId}/chapters`} className="btn btn-outline-secondary">Back</Link>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <h5>{editing ? 'Edit Question' : 'New Question'}</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Question</label>
                <textarea className="form-control" rows={3} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required />
              </div>

              <label className="form-label fw-semibold">Answers (mark the correct one)</label>
              {form.propositions.map((prop, i) => (
                <div key={i} className="input-group mb-2">
                  <div className="input-group-text">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={prop.isTrue}
                      onChange={() => updateProposition(i, 'isTrue', true)}
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Answer ${i + 1}`}
                    value={prop.content}
                    onChange={(e) => updateProposition(i, 'content', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => removeProposition(i)}
                    disabled={form.propositions.length <= 2}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
              <button type="button" onClick={addProposition} className="btn btn-sm btn-outline-secondary mb-3">
                <i className="fas fa-plus me-1"></i>Add Answer
              </button>

              <div>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline-secondary ms-2">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {quizzes.length === 0 ? (
        <div className="alert alert-info">No quiz questions yet. Click "Add Question" to get started.</div>
      ) : (
        <div className="list-group">
          {quizzes.map((quiz, i) => (
            <div key={quiz.id} className="list-group-item list-group-item-action">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <strong>{i + 1}. {quiz.question}</strong>
                  <div className="mt-2">
                    {quiz.propositions?.map((p, j) => (
                      <span key={j} className={`badge me-1 ${p.isTrue ? 'bg-success' : 'bg-secondary'}`}>
                        {p.content} {p.isTrue ? '✓' : ''}
                      </span>
                    ))}
                    {(!quiz.propositions || quiz.propositions.length === 0) && (
                      <span className="badge bg-success">{quiz.correctPropositions} ✓</span>
                    )}
                  </div>
                </div>
                <div className="d-flex gap-2 ms-3">
                  <button onClick={() => handleEdit(quiz)} className="btn btn-sm btn-outline-primary">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => handleDelete(quiz.id)} className="btn btn-sm btn-outline-danger">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
