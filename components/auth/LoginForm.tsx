'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const { login } = useAuth();
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
        const message = data.message === 'Invalid credentials'
          ? t('INVALID_CREDENTIALS_KEY')
          : (data.message || t('SOMETHING_WENT_WRONG_KEY'));
        throw new Error(message);
      }

      if (!data.token || !data.refreshToken || !data.user) {
        throw new Error(t('SOMETHING_WENT_WRONG_KEY'));
      }

      login(data.token, data.refreshToken, data.user);
      localStorage.removeItem('token');

      // Redirect to home or dashboard
      router.push('/');
      router.refresh(); // Refresh to update auth state if using cookies/server components
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t('SOMETHING_WENT_WRONG_KEY'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card card-body shadow p-4 p-sm-5">
      {/* Title */}
      <h3 className="mb-3">{t('WELCOME_BACK_KEY')}</h3>
      <p className="mb-0">
        {t('NEW_HERE_KEY')} <Link href="/register">{t('CREATE_ACCOUNT_KEY')}</Link>
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
          <label className="form-label">{t('EMAIL_ADDRESS_KEY')}</label>
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
          <label className="form-label">{t('PASSWORD_KEY')}</label>
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
            <label className="form-check-label ms-1" htmlFor="rememberCheck">{t('REMEMBER_ME_KEY')}</label>
          </div>
          <Link href="/forgot-password" className="text-primary-hover">
            {t('FORGOT_PASSWORD_KEY')}
          </Link>
        </div>
        {/* Button */}
        <div className="d-grid">
          <button type="submit" className="btn btn-dark mb-0" disabled={loading}>
            {loading ? t('LOGGING_IN_KEY') : t('LOGIN_KEY')}
          </button>
        </div>


      </form>
      {/* Form END */}
    </div>
  );
}
