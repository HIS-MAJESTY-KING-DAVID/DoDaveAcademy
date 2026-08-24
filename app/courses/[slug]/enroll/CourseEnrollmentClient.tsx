'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import PaymentCheckout from '@/components/payment/PaymentCheckout';

export default function CourseEnrollmentClient({
  courseId,
  courseSlug,
  courseTitle,
  isFree,
  amount,
  customerName,
  customerEmail,
}: {
  courseId: number;
  courseSlug: string;
  courseTitle: string;
  isFree: boolean;
  amount: number;
  customerName: string;
  customerEmail: string;
}) {
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function enrollFreeCourse() {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || t('UNABLE_TO_ENROLL_KEY'));
      router.push(`/learn/${courseSlug}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t('UNABLE_TO_ENROLL_KEY'));
    } finally {
      setLoading(false);
    }
  }

  if (isFree) {
    return (
      <div className="card border-0 shadow-sm p-4 max-w-xl">
        <h3>{t('FREE_ENROLLMENT_KEY')}</h3>
        <p className="text-muted">{t('FREE_ENROLLMENT_DESCRIPTION_KEY')}</p>
        {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <button className="btn btn-primary" disabled={loading} onClick={enrollFreeCourse}>
          {loading ? t('ENROLLING_KEY') : t('ENROLL_FOR_FREE_KEY')}
        </button>
      </div>
    );
  }

  return (
    <PaymentCheckout
      amount={amount}
      itemLabel={courseTitle}
      type="course"
      courseId={courseId}
      customerName={customerName}
      customerEmail={customerEmail}
      onSuccess={() => setMessage(t('PAYMENT_AFTER_CONFIRMATION_KEY'))}
      onError={setMessage}
    />
  );
}
