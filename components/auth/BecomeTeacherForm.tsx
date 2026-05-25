'use client';

import { useState } from 'react';

export default function BecomeTeacherForm() {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    expertise: '',
    bio: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/become-teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess('Your application has been submitted successfully. We will review it and get back to you within 48 hours.');
      setFormData({ email: '', fullName: '', phone: '', expertise: '', bio: '' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="mb-3">
        <label className="form-label">Full Name *</label>
        <input type="text" className="form-control" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Your full name" />
      </div>

      <div className="mb-3">
        <label className="form-label">Email *</label>
        <input type="email" className="form-control" name="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone Number</label>
        <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="+237 XXX XXX XXX" />
      </div>

      <div className="mb-3">
        <label className="form-label">Area of Expertise *</label>
        <select className="form-select" name="expertise" required value={formData.expertise} onChange={handleChange}>
          <option value="">Select your expertise</option>
          <option value="web-development">Web Development</option>
          <option value="mobile-development">Mobile Development</option>
          <option value="data-science">Data Science & AI</option>
          <option value="design">Design & Graphics</option>
          <option value="business">Business & Management</option>
          <option value="language">Languages</option>
          <option value="mathematics">Mathematics & Sciences</option>
          <option value="music">Music & Arts</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Bio / About You *</label>
        <textarea className="form-control" name="bio" rows={4} required value={formData.bio} onChange={handleChange} placeholder="Tell us about your teaching experience and qualifications..." />
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}
