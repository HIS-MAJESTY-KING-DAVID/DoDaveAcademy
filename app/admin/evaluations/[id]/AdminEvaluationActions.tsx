'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminEvaluationActions({ id, isPublished, isPassed }: { id: number; isPublished: boolean; isPassed: boolean }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  async function update(payload: Record<string, boolean>) {
    setSaving(true); setError('');
    try {
      const response = await fetch(`/api/admin/evaluations/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to update evaluation');
      router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to update evaluation'); } finally { setSaving(false); }
  }
  async function remove() {
    if (!window.confirm('Delete this evaluation?')) return;
    setSaving(true); setError('');
    try {
      const response = await fetch(`/api/admin/evaluations/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to delete evaluation');
      router.push('/admin/evaluations');
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to delete evaluation'); setSaving(false); }
  }
  return <div className="text-end">{error && <div className="text-danger small mb-2">{error}</div>}<div className="btn-group"><button className="btn btn-outline-primary" disabled={saving} onClick={() => update({ isPublished: !isPublished })}>{isPublished ? 'Unpublish' : 'Publish'}</button><button className="btn btn-outline-warning" disabled={saving} onClick={() => update({ isPassed: !isPassed })}>{isPassed ? 'Unlock' : 'Lock'}</button><button className="btn btn-outline-danger" disabled={saving || isPassed} onClick={remove}>Delete</button></div></div>;
}
