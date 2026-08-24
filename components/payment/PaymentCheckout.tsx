'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PaymentCheckoutProps {
  amount: number;
  itemLabel: string;
  type: 'course' | 'subscription';
  customerEmail: string;
  customerName: string;
  courseId?: number;
  subscriptionId?: number;
  onSuccess?: (reference: string) => void;
  onError?: (message: string) => void;
}

export default function PaymentCheckout({
  amount,
  itemLabel,
  type,
  customerEmail,
  customerName,
  courseId,
  subscriptionId,
  onSuccess,
  onError,
}: PaymentCheckoutProps) {
  const { t } = useTranslation();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const res = await fetch('/api/payment/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          phone,
          customerName,
          customerEmail,
          itemLabel,
          courseId,
          subscriptionId,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMessage = data.message || t('PAYMENT_INITIATION_FAILED_KEY');
        setMessage(errorMessage);
        setMessageType('error');
        onError?.(errorMessage);
        return;
      }

      const successMessage = t('PAYMENT_INITIATED_KEY', { reference: data.reference });
      setMessage(successMessage);
      setMessageType('success');
      onSuccess?.(data.reference);
    } catch {
      const errorMessage = t('NETWORK_ERROR_KEY');
      setMessage(errorMessage);
      setMessageType('error');
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('PAYMENT_CHECKOUT_KEY')}</h3>
      <p className="text-sm text-gray-600 mb-4">
        {itemLabel} — <span className="font-bold">{amount.toLocaleString()} FCFA</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('PHONE_NUMBER_KEY')}</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="6XXXXXXXX"
            required
            pattern="\\+?[0-9\\s()\\-]{8,20}"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]"
          />
          <small className="text-muted">{t('ORANGE_MTN_KEY')}</small>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--brand-secondary)] text-white py-2 px-4 rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t('PROCESSING_KEY') : t('PAY_AMOUNT_KEY', { amount: amount.toLocaleString() })}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded text-sm ${messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`} role="status">
          {message}
        </div>
      )}
    </div>
  );
}
