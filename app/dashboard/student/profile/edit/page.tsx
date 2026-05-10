'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StudentProfileEditPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    pseudo: '',
    phoneNumber: '',
    address: '',
    gender: 'M',
    bornAt: '',
  });

  useEffect(() => {
    fetch('/api/profile')
      .then((r) => r.json())
      .then((d) => {
        if (d.data?.person) {
          const p = d.data.person;
          setForm({
            firstName: p.firstName || '',
            lastName: p.lastName || '',
            pseudo: p.pseudo || '',
            phoneNumber: p.phoneNumber || '',
            address: p.address || '',
            gender: p.gender || 'M',
            bornAt: p.bornAt ? new Date(p.bornAt).toISOString().split('T')[0] : '',
          });
        }
        setLoading(false);
      })
      .catch(() => { setError('Failed to load profile'); setLoading(false); });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setSaving(false);
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
        <h2 className="mb-0">Edit Profile</h2>
        <Link href="/dashboard/student/profile" className="btn btn-outline-secondary">Cancel</Link>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">First Name</label>
                <input type="text" className="form-control" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Last Name</label>
                <input type="text" className="form-control" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Username (pseudo)</label>
              <input type="text" className="form-control" value={form.pseudo} onChange={(e) => setForm({ ...form, pseudo: e.target.value })} />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Phone Number</label>
                <input type="tel" className="form-control" value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Gender</label>
                <select className="form-select" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Address</label>
              <input type="text" className="form-control" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Date of Birth</label>
              <input type="date" className="form-control" value={form.bornAt} onChange={(e) => setForm({ ...form, bornAt: e.target.value })} />
            </div>

            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
