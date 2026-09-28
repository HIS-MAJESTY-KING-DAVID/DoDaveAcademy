'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: searchParams.get('ref')?.toUpperCase() || '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          password: formData.password,
          referralCode: formData.referralCode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Success, redirect to login
      router.push('/login');
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
    <div className="bg-light rounded-3 p-4 p-sm-5 position-relative">
      {/* Title */}
      <div className="text-center mb-4">
        <h2 className="mb-0">Create your account</h2>
        <p className="mb-0">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </div>

      {error && (
        <div className="alert alert-danger mb-4">
          {error}
        </div>
      )}

      {/* Form START */}
      <form className="mt-4 text-start" onSubmit={handleSubmit}>
        <div className="row">
          {/* First Name */}
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name</label>
            <input 
              type="text" 
              className="form-control" 
              name="firstName"
              required 
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          {/* Last Name */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name</label>
            <input 
              type="text" 
              className="form-control" 
              name="lastName"
              required 
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="col-12 mb-3">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              name="email"
              required 
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              name="password"
              required 
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Confirm Password</label>
            <input 
              type="password" 
              className="form-control" 
              name="confirmPassword"
              required 
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Referral code */}
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="referralCode">Referral Code <span className="text-muted">(optional)</span></label>
            <input
              type="text"
              className="form-control text-uppercase"
              id="referralCode"
              name="referralCode"
              maxLength={6}
              pattern="[A-Za-z0-9]{6}"
              value={formData.referralCode}
              onChange={handleChange}
              placeholder="Enter your inviter's code"
            />
            <small className="text-muted">Use the code shared by the person who invited you to DoDave Academy.</small>
          </div>

          {/* Terms */}
          <div className="col-12 mb-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="termsCheck" required />
              <label className="form-check-label" htmlFor="termsCheck">
                I agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>
              </label>
            </div>
          </div>

          {/* Button */}
          <div className="col-12 d-grid">
            <button type="submit" className="btn btn-primary mb-0" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </div>
        </div>
      </form>
      {/* Form END */}

      {/* Divider */}
      <div className="position-relative my-4">
        <hr />
        <p className="small position-absolute top-50 start-50 translate-middle bg-body px-2">Or sign up with</p>
      </div>

      {/* Social Buttons */}
      <div className="row g-3 justify-content-center">
        <div className="col-sm-6 col-md-4 d-grid">
          <a href="#" className="btn btn-outline-light mb-0 bg-white">
            <i className="fab fa-fw fa-google text-google-icon me-2"></i>Google
          </a>
        </div>
        <div className="col-sm-6 col-md-4 d-grid">
          <a href="#" className="btn btn-outline-light mb-0 bg-white">
            <i className="fab fa-fw fa-facebook-f text-facebook me-2"></i>Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
