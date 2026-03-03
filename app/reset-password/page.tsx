'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    if (password !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match');
      return;
    }

    if (!token) {
        setStatus('error');
        setMessage('Invalid or missing token');
        return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setTimeout(() => {
            router.push('/login');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An unexpected error occurred');
    }
  };

  if (!token) {
      return (
        <div className="text-center">
            <h3 className="text-danger">Invalid Link</h3>
            <p>The password reset link is invalid or missing.</p>
            <Link href="/forgot-password" className="btn btn-primary">Request a new link</Link>
        </div>
      )
  }

  return (
    <>
        <h1 className="fs-2">Reset Password</h1>
        <h5 className="fw-light mb-4">Enter your new password below.</h5>

        {/* Form START */}
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="inputPassword5" className="form-label">New Password *</label>
            <div className="input-group input-group-lg">
            <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3">
                <i className="fas fa-lock"></i>
            </span>
            <input 
                type="password" 
                className="form-control border-0 bg-light rounded-end ps-1" 
                placeholder="********" 
                id="inputPassword5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
            />
            </div>
        </div>

        <div className="mb-4">
            <label htmlFor="inputPassword6" className="form-label">Confirm Password *</label>
            <div className="input-group input-group-lg">
            <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3">
                <i className="fas fa-lock"></i>
            </span>
            <input 
                type="password" 
                className="form-control border-0 bg-light rounded-end ps-1" 
                placeholder="********" 
                id="inputPassword6"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
            />
            </div>
        </div>

        {/* Button */}
        <div className="align-items-center mt-0">
            <div className="d-grid">
            <button className="btn btn-primary mb-0" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Resetting...' : 'Change Password'}
            </button>
            </div>
        </div>
        </form>
        {/* Form END */}

        {/* Message */}
        {message && (
        <div className={`alert mt-4 ${status === 'success' ? 'alert-success' : 'alert-danger'}`}>
            {message}
        </div>
        )}
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <main>
      <section className="p-0 d-flex align-items-center position-relative overflow-hidden">
        <div className="container-fluid">
          <div className="row">
            {/* Left */}
            <div className="col-12 col-lg-6 d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100">
              <div className="p-3 p-lg-5">
                <div className="text-center">
                  <h2 className="fw-bold">Secure your account</h2>
                  <p className="mb-0 h6 fw-light">Choose a strong password!</p>
                </div>
                <img src="/assets/images/element/02.svg" className="mt-5" alt="" />
              </div>
            </div>

            {/* Right */}
            <div className="col-12 col-lg-6 m-auto">
              <div className="row my-5">
                <div className="col-sm-10 col-xl-8 m-auto">
                  <span className="mb-0 fs-1">🔐</span>
                  <Suspense fallback={<div>Loading...</div>}>
                    <ResetPasswordForm />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
