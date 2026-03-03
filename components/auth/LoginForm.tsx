'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Store token
      localStorage.setItem('token', data.token);
      
      // Redirect to home or dashboard
      router.push('/');
      router.refresh(); // Refresh to update auth state if using cookies/server components
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
    <div className="card card-body shadow p-4 p-sm-5">
      {/* Title */}
      <h2 className="mb-0 h3">Welcome Back</h2>
      <p className="mb-0">
        New here? <Link href="/register">Create an account</Link>
      </p>

      {error && (
        <div className="alert alert-danger mt-3 mb-0">
          {error}
        </div>
      )}

      {/* Form START */}
      <form className="mt-3 mt-sm-4 text-start" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input 
            type="email" 
            className="form-control" 
            required 
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
            className="form-control" 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Remember me */}
        <div className="mb-3 d-sm-flex justify-content-between">
          <div>
            <input type="checkbox" className="form-check-input" id="rememberCheck" />
            <label className="form-check-label ms-1" htmlFor="rememberCheck">Remember me</label>
          </div>
          <Link href="/forgot-password" className="text-primary-hover">
            Forgot Password?
          </Link>
        </div>
        {/* Button */}
        <div className="d-grid">
          <button type="submit" className="btn btn-dark mb-0" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        {/* Divider */}
        <div className="position-relative my-4">
          <hr />
          <p className="small position-absolute top-50 start-50 translate-middle bg-body px-2">Or sign in with</p>
        </div>

        <div className="row g-3">
          <div className="col-sm-6 d-grid">
            <a href="#" className="btn btn-outline-light mb-0">
              <i className="fab fa-fw fa-google text-google-icon me-2"></i>Google
            </a>
          </div>

          <div className="col-sm-6 d-grid">
            <a href="#" className="btn btn-outline-light mb-0">
              <i className="fab fa-fw fa-facebook-f text-facebook me-2"></i>Facebook
            </a>
          </div>
        </div>
      </form>
      {/* Form END */}
    </div>
  );
}
