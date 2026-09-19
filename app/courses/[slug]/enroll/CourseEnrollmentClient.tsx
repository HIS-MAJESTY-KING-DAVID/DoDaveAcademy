'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function enrollFreeCourse() {
    setLoading(true); setMessage('');
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ courseId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to enroll');
      router.push(`/learn/${courseSlug}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to enroll');
    } finally { setLoading(false); }
  }

  if (isFree) {
    return (
      <div className="card border-0 shadow-sm p-4 max-w-xl">
        <h3>Free enrollment</h3>
        <p className="text-muted">This course is free. Enroll now to add it to your learning dashboard.</p>
        {message && <div className="alert alert-danger">{message}</div>}
        <button className="btn btn-primary" disabled={loading} onClick={enrollFreeCourse}>{loading ? 'Enrolling…' : 'Enroll for free'}</button>
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
      onSuccess={() => setMessage('Payment initiated. After confirmation, your course will appear in My Courses.')}
      onError={setMessage}
    />
  );
}
