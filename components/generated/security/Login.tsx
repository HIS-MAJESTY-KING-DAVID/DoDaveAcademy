import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from './AuthLayout';

export default function Login() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Implement actual login logic here
      console.log('Login attempt:', { identifier, password });
      
      // Simulate successful login
      // router.push('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* Title */}
      <h2 className="mb-0 h3">Welcome back</h2>
      <p className="mb-0">New here? <Link href="/register">Create an account</Link></p>

      {error && (
        <div className="alert alert-danger mt-3">{error}</div>
      )}

      {/* Form START */}
      <form onSubmit={handleSubmit} className="mt-3 mt-sm-4 text-start">
        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email or Username</label>
          <input 
            type="text" 
            className="form-control" 
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required 
            autoFocus 
          />
        </div>
        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
            className="form-control" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        {/* Remember me */}
        <div className="mb-3 d-sm-flex justify-content-between">
          <div>
            <input type="checkbox" className="form-check-input" id="rememberCheck" />
            <label className="form-check-label" htmlFor="rememberCheck">Remember me</label>
          </div>
          <Link href="/forgot-password" className="text-primary-hover">Forgot password?</Link>
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
            <button type="button" className="btn btn-outline-light mb-0"><i className="fab fa-fw fa-google text-google-icon me-2"></i>Google</button>
          </div>

          <div className="col-sm-6 d-grid">
            <button type="button" className="btn btn-outline-light mb-0"><i className="fab fa-fw fa-facebook-f text-facebook me-2"></i>Facebook</button>
          </div>
        </div>
      </form>
      {/* Form END */}
    </AuthLayout>
  );
}
