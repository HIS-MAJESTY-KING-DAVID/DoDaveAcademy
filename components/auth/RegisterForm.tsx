'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function RegisterForm() {
  const router = useRouter();
  const { t } = useTranslation();
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
      setError(t('PASSWORD_MISMATCH_KEY'));
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
        setError(t('SOMETHING_WENT_WRONG_KEY'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light rounded-3 p-4 p-sm-5 position-relative">
      {/* Title */}
      <div className="text-center mb-4">
        <h2 className="mb-0">{t('CREATE_ACCOUNT_KEY')}</h2>
        <p className="mb-0">
          {t('ALREADY_HAVE_ACCOUNT_KEY')} <Link href="/login">{t('LOGIN_LINK_KEY')}</Link>
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
            <label className="form-label">{t('FIRST_NAME_KEY')}</label>
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
            <label className="form-label">{t('LAST_NAME_KEY')}</label>
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
            <label className="form-label">{t('EMAIL_ADDRESS_KEY')}</label>
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
            <label className="form-label">{t('PASSWORD_KEY')}</label>
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
            <label className="form-label">{t('CONFIRM_PASSWORD_KEY')}</label>
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
            <label className="form-label" htmlFor="referralCode">{t('INVITATION_CODE_KEY')} <span className="text-muted">({t('OPTIONAL_KEY')})</span></label>
            <input
              type="text"
              className="form-control text-uppercase"
              id="referralCode"
              name="referralCode"
              maxLength={6}
              pattern="[A-Za-z0-9]{6}"
              value={formData.referralCode}
              onChange={handleChange}
              placeholder={t('INVITATION_CODE_PLACEHOLDER_KEY')}
            />
            <small className="text-muted">{t('REFERRAL_HELP_KEY')}</small>
          </div>

          {/* Terms */}
          <div className="col-12 mb-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="termsCheck" required />
              <label className="form-check-label" htmlFor="termsCheck">
                {t('AGREE_TERMS_PREFIX_KEY')} <Link href="/terms">{t('TERMS_OF_SERVICE_KEY')}</Link> {t('AND_KEY')} <Link href="/privacy">{t('PRIVACYPOLICY_KEY')}</Link>
              </label>
            </div>
          </div>

          {/* Button */}
          <div className="col-12 d-grid">
            <button type="submit" className="btn btn-primary mb-0" disabled={loading}>
              {loading ? t('CREATING_ACCOUNT_KEY') : t('SIGN_UP_KEY')}
            </button>
          </div>
        </div>
      </form>
      {/* Form END */}


    </div>
  );
}
