'use client';

import { useState } from 'react';

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
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/payment/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          amount,
          phone,
          customerName,
          customerEmail,
          itemLabel,
          courseId,
          subscriptionId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Payment initiation failed');
        onError?.(data.message || 'Payment failed');
        return;
      }

      setMessage(`Payment initiated! Reference: ${data.reference}. Please check your phone to complete.`);
      onSuccess?.(data.reference);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setMessage(msg);
      onError?.(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Checkout</h3>
      <p className="text-sm text-gray-600 mb-4">
        {itemLabel} — <span className="font-bold">{amount.toLocaleString()} FCFA</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Orange/MTN)</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="6XXXXXXXX"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--brand-secondary)] text-white py-2 px-4 rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : `Pay ${amount.toLocaleString()} FCFA`}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded text-sm ${message.includes('failed') || message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
    </div>
  );
}
