'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  isPublished: boolean;
  isValidated: boolean;
  isFree: boolean;
  difficultyLevel: string;
  language: string;
  tags: string | null;
  subscriptionPrice: number | null;
  categoryId: number | null;
  skillLevelId: number | null;
  category?: { id: number; name: string } | null;
  skillLevel?: { id: number; name: string } | null;
  media?: { imageFile: string | null } | null;
  chapters?: { id: number; title: string; number: number | null; lessons: { id: number; title: string }[]; quizzes: { id: number; question: string }[] }[];
  faqs?: { id: number; question: string; answer: string }[];
}

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  const [form, setForm] = useState({
    title: '',
    description: '',
    content: '',
    difficultyLevel: 'beginner',
    language: 'fr',
    isFree: false,
    subscriptionPrice: '',
    tags: '',
  });

  const [faqItems, setFaqItems] = useState<{ question: string; answer: string }[]>([]);

  useEffect(() => {
    fetch(`/api/instructor/courses/${courseId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.data) {
          setCourse(d.data);
          setForm({
            title: d.data.title,
            description: d.data.description,
            content: d.data.content || '',
            difficultyLevel: d.data.difficultyLevel,
            language: d.data.language,
            isFree: d.data.isFree,
            subscriptionPrice: d.data.subscriptionPrice?.toString() || '',
            tags: d.data.tags || '',
          });
          setFaqItems(d.data.faqs?.map((f: { question: string; answer: string }) => ({ question: f.question, answer: f.answer })) || []);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load course');
        setLoading(false);
      });
  }, [courseId]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/instructor/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          subscriptionPrice: form.subscriptionPrice ? parseInt(form.subscriptionPrice) : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSuccess('Course saved successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async (action: 'publish' | 'unpublish') => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/instructor/courses/${courseId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setCourse((prev) => prev ? { ...prev, isPublished: action === 'publish' } : prev);
      setSuccess(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setSaving(false);
    }
  };

  const addFaq = () => setFaqItems([...faqItems, { question: '', answer: '' }]);
  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqItems];
    updated[index][field] = value;
    setFaqItems(updated);
  };
  const removeFaq = (index: number) => setFaqItems(faqItems.filter((_, i) => i !== index));

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">Course not found</div>
        <Link href="/dashboard/instructor/courses" className="btn btn-outline-secondary">Back</Link>
      </div>
    );
  }

  const tabs = [
    { key: 'details', label: 'Details' },
    { key: 'chapters', label: `Chapters (${course.chapters?.length || 0})` },
    { key: 'faq', label: `FAQ (${faqItems.length})` },
  ];

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">{course.title || 'Edit Course'}</h2>
          <span className={`badge ${course.isPublished ? (course.isValidated ? 'bg-success' : 'bg-warning') : 'bg-secondary'}`}>
            {course.isPublished ? (course.isValidated ? 'Published' : 'Pending') : 'Draft'}
          </span>
        </div>
        <div className="d-flex gap-2">
          {course.isPublished ? (
            <button onClick={() => handlePublish('unpublish')} className="btn btn-outline-warning" disabled={saving}>
              Unpublish
            </button>
          ) : (
            <button onClick={() => handlePublish('publish')} className="btn btn-success" disabled={saving}>
              {saving ? 'Processing...' : 'Publish'}
            </button>
          )}
          <Link href="/dashboard/instructor/courses" className="btn btn-outline-secondary">Back</Link>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <ul className="nav nav-tabs mb-4">
        {tabs.map((tab) => (
          <li key={tab.key} className="nav-item">
            <button
              className={`nav-link ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {activeTab === 'details' && (
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input
                type="text"
                className="form-control form-control-lg"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                className="form-control"
                rows={5}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Content (syllabus, goals)</label>
              <textarea
                className="form-control"
                rows={8}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold">Difficulty</label>
                <select
                  className="form-select"
                  value={form.difficultyLevel}
                  onChange={(e) => setForm({ ...form, difficultyLevel: e.target.value })}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Language</label>
                <select
                  className="form-select"
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value })}
                >
                  <option value="fr">French</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Free Course?</label>
                <div className="form-check form-switch mt-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    role="switch"
                    checked={form.isFree}
                    onChange={(e) => setForm({ ...form, isFree: e.target.checked })}
                  />
                  <label className="form-check-label">{form.isFree ? 'Yes' : 'No'}</label>
                </div>
              </div>
            </div>
            {!form.isFree && (
              <div className="mb-3">
                <label className="form-label fw-semibold">Price (XAF)</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.subscriptionPrice}
                  onChange={(e) => setForm({ ...form, subscriptionPrice: e.target.value })}
                />
              </div>
            )}
            <div className="mb-3">
              <label className="form-label fw-semibold">Tags</label>
              <input
                type="text"
                className="form-control"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
            </div>
            <button onClick={handleSave} className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'chapters' && (
        <div>
          <div className="d-flex justify-content-end mb-3">
            <Link href={`/dashboard/instructor/courses/${courseId}/chapters`} className="btn btn-primary">
              <i className="fas fa-plus me-2"></i>Manage Chapters & Lessons
            </Link>
          </div>
          {course.chapters && course.chapters.length > 0 ? (
            <div className="list-group">
              {course.chapters.map((chapter, ci) => (
                <div key={chapter.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-1">
                      {chapter.number ? `${chapter.number}. ` : ''}{chapter.title}
                    </h6>
                    <div className="d-flex gap-2">
                      <Link
                        href={`/dashboard/instructor/courses/${courseId}/chapters/${chapter.id}/lessons`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        Lessons ({chapter.lessons.length})
                      </Link>
                      <Link
                        href={`/dashboard/instructor/courses/${courseId}/chapters/${chapter.id}/quizzes`}
                        className="btn btn-sm btn-outline-warning"
                      >
                        Quizzes ({chapter.quizzes.length})
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">No chapters yet. Click the button above to add one.</div>
          )}
        </div>
      )}

      {activeTab === 'faq' && (
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between mb-3">
              <h5 className="mb-0">Course FAQ</h5>
              <button onClick={addFaq} className="btn btn-sm btn-primary">
                <i className="fas fa-plus me-1"></i>Add FAQ
              </button>
            </div>
            {faqItems.length === 0 ? (
              <p className="text-muted">No FAQs yet. Add common questions students ask about this course.</p>
            ) : (
              faqItems.map((item, i) => (
                <div key={i} className="card mb-3 border">
                  <div className="card-body">
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Question"
                        value={item.question}
                        onChange={(e) => updateFaq(i, 'question', e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
                      <textarea
                        className="form-control"
                        rows={2}
                        placeholder="Answer"
                        value={item.answer}
                        onChange={(e) => updateFaq(i, 'answer', e.target.value)}
                      />
                    </div>
                    <button onClick={() => removeFaq(i)} className="btn btn-sm btn-outline-danger">
                      <i className="fas fa-trash me-1"></i>Remove
                    </button>
                  </div>
                </div>
              ))
            )}
            {faqItems.length > 0 && (
              <button onClick={handleSave} className="btn btn-primary mt-2" disabled={saving}>
                {saving ? 'Saving...' : 'Save FAQs'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
