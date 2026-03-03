'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong');
      }
    } catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
      setStatus('error');
      setMessage('An unexpected error occurred');
    }
  };

  return (
    <main>
      <section className="p-0 d-flex align-items-center position-relative overflow-hidden">
        <div className="container-fluid">
          <div className="row">
            {/* Left */}
            <div className="col-12 col-lg-6 d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100">
              <div className="p-3 p-lg-5">
                <div className="text-center">
                  <h2 className="fw-bold">Welcome to our community</h2>
                  <p className="mb-0 h6 fw-light">Let&apos;s learn something new today!</p>
                </div>
                <Image src="/assets/images/element/02.svg" className="mt-5" alt="" width={300} height={300} />
              </div>
            </div>

            {/* Right */}
            <div className="col-12 col-lg-6 m-auto">
              <div className="row my-5">
                <div className="col-sm-10 col-xl-8 m-auto">
                  <span className="mb-0 fs-1">🤔</span>
                  <h1 className="fs-2">Forgot Password?</h1>
                  <h5 className="fw-light mb-4">To receive a new password, enter your email address below.</h5>

                  {/* Form START */}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="exampleInputEmail1" className="form-label">Email address *</label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3">
                          <i className="bi bi-envelope-fill"></i>
                        </span>
                        <input 
                          type="email" 
                          className="form-control border-0 bg-light rounded-end ps-1" 
                          placeholder="E-mail" 
                          id="exampleInputEmail1"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Button */}
                    <div className="align-items-center mt-0">
                      <div className="d-grid">
                        <button className="btn btn-primary mb-0" type="submit" disabled={status === 'loading'}>
                          {status === 'loading' ? 'Sending...' : 'Reset password'}
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

                  {/* Links */}
                  <div className="mt-4 text-center">
                    <span>Back to <Link href="/login">Sign in</Link></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
