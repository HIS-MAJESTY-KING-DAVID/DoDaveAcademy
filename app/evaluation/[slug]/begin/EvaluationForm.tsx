'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Question {
  id: number;
  question: string;
  proposition1: string;
  proposition2: string;
  proposition3: string | null;
  proposition4: string | null;
}

interface EvaluationData {
  id: number;
  title: string;
  description: string;
  duration: number;
  slug: string;
  evaluationQuestions: Question[];
}

export default function EvaluationForm({
  evaluation,
  studentId,
}: {
  evaluation: EvaluationData;
  studentId: number;
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [timeLeft, setTimeLeft] = useState(evaluation.duration * 60);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleCheck = (questionId: number, propositionIdx: string) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];
      if (current.includes(propositionIdx)) {
        return { ...prev, [questionId]: current.filter((p) => p !== propositionIdx) };
      }
      return { ...prev, [questionId]: [...current, propositionIdx] };
    });
  };

  const handleSubmit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/evaluation/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          evaluationId: evaluation.id,
          studentId,
          answers,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Submission failed');
        return;
      }
      router.push(`/evaluation/${evaluation.slug}/result`);
    } catch {
      setError('Network error');
    } finally {
      setSubmitting(false);
    }
  }, [submitting, evaluation.id, evaluation.slug, studentId, answers, router]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{evaluation.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{evaluation.description}</p>
          </div>
          <div className={`text-lg font-bold px-4 py-2 rounded ${timeLeft < 60 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
          {evaluation.evaluationQuestions.map((q, idx) => {
            const props = [q.proposition1, q.proposition2];
            if (q.proposition3) props.push(q.proposition3);
            if (q.proposition4) props.push(q.proposition4);

            return (
              <div key={q.id} className="bg-white rounded-lg shadow p-6">
                <p className="font-medium text-gray-800 mb-3">
                  {idx + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {props.map((prop, pIdx) => {
                    const key = (pIdx + 1).toString();
                    const checked = (answers[q.id] || []).includes(key);
                    return (
                      <label key={key} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleCheck(q.id, key)}
                          className="w-4 h-4 text-[var(--brand-primary)] border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{prop}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {error && <div className="bg-red-100 text-red-700 p-3 rounded text-sm">{error}</div>}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-[var(--brand-primary)] text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Evaluation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
