'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RetraitPage() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [paymentMethods, setPaymentMethods] = useState<{ id: number; label: string; code: string }[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/payment-methods')
      .then((r) => r.json())
      .then((data) => setPaymentMethods(data))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/student/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          phoneNumber,
          paymentMethodId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Withdrawal request submitted successfully!');
        setAmount('');
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Demander un retrait</h2>

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Montant (CFA) *</label>
                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min={1}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Numéro de téléphone *</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="6XX XX XX XX"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Méthode de retrait *</label>
                  <select
                    className="form-select"
                    value={paymentMethodId}
                    onChange={(e) => setPaymentMethodId(e.target.value)}
                    required
                  >
                    <option value="">Choisir...</option>
                    {paymentMethods.map((pm) => (
                      <option key={pm.id} value={pm.id}>
                        {pm.label} ({pm.code})
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'En cours...' : 'Soumettre la demande'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
