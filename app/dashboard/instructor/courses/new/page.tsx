'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    categoryId: '',
    skillLevelId: '',
    isFree: false,
    difficultyLevel: 'beginner',
    language: 'fr',
    tags: '',
    subscriptionPrice: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/instructor/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          categoryId: form.categoryId ? parseInt(form.categoryId) : undefined,
          skillLevelId: form.skillLevelId ? parseInt(form.skillLevelId) : undefined,
          subscriptionPrice: form.subscriptionPrice ? parseInt(form.subscriptionPrice) : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      router.push(`/dashboard/instructor/courses/${data.data.id}/edit`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">New Course</h2>
        <Link href="/dashboard/instructor/courses" className="btn btn-outline-secondary">
          <i className="fas fa-arrow-left me-2"></i>Back
        </Link>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Course Title</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="e.g., Introduction to Python"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Describe what students will learn..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
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
                  placeholder="e.g., 5000"
                  value={form.subscriptionPrice}
                  onChange={(e) => setForm({ ...form, subscriptionPrice: e.target.value })}
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label fw-semibold">Tags (comma separated)</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., python, programming, beginner"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2"></span>Creating...</>
              ) : (
                <><i className="fas fa-plus me-2"></i>Create Course</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
