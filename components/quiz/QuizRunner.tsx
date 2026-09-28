'use client';

import { useEffect, useMemo, useState } from 'react';

interface Proposition { index: string; content: string }
interface Question { id: number; question: string; multi: boolean; propositions: Proposition[] }
interface QuizResult { quizId: number; result: string; isCorrect: boolean }
interface AttemptResult { score: number; total: number; percentage: number; isPassed: boolean; retryAfter?: string | null; results?: QuizResult[] }

export default function QuizRunner({ questions, chapterId, initialCooldownUntil }: { questions: Question[]; chapterId: number; initialCooldownUntil: string | null }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [cooldownUntil, setCooldownUntil] = useState(initialCooldownUntil);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!cooldownUntil) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [cooldownUntil]);

  const cooldownSeconds = cooldownUntil ? Math.max(0, Math.ceil((new Date(cooldownUntil).getTime() - now) / 1000)) : 0;
  const currentQuestion = questions[currentQuestionIndex];
  const selected = answers[currentQuestion.id] || [];
  const resultByQuiz = useMemo(() => new Map((result?.results || []).map((item) => [item.quizId, item])), [result]);

  function toggleAnswer(index: string) {
    setAnswers((current) => {
      const selectedAnswers = current[currentQuestion.id] || [];
      if (currentQuestion.multi) {
        return { ...current, [currentQuestion.id]: selectedAnswers.includes(index) ? selectedAnswers.filter((value) => value !== index) : [...selectedAnswers, index] };
      }
      return { ...current, [currentQuestion.id]: [index] };
    });
  }

  async function submit() {
    setIsSubmitting(true); setError('');
    try {
      const response = await fetch('/api/student/quiz-attempt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chapterId, answers }) });
      const data = await response.json();
      if (!response.ok) {
        if (data.cooldown && data.retryAfter) setCooldownUntil(data.retryAfter);
        throw new Error(data.message || 'Quiz submission failed');
      }
      setResult(data);
      if (!data.isPassed && data.retryAfter) setCooldownUntil(data.retryAfter);
    } catch (err) { setError(err instanceof Error ? err.message : 'Quiz submission failed'); } finally { setIsSubmitting(false); }
  }

  if (result) {
    return (
      <div className="card shadow-sm"><div className="card-body">
        <div className={`alert ${result.isPassed ? 'alert-success' : 'alert-warning'}`}><strong>{result.isPassed ? 'Chapter passed.' : 'Chapter not passed yet.'}</strong> You scored {Math.round(result.percentage)}% ({result.score}/{result.total}).</div>
        <div className="list-group mb-4">{questions.map((question, index) => { const item = resultByQuiz.get(question.id); return <div className="list-group-item" key={question.id}><div className="d-flex justify-content-between"><span>{index + 1}. {question.question}</span><span className={item?.isCorrect ? 'text-success' : 'text-danger'}>{item?.isCorrect ? 'Correct' : 'Incorrect'}</span></div><small className="text-muted">Your answer: {item?.result || 'No answer'}</small></div>; })}</div>
        {!result.isPassed && cooldownSeconds > 0 && <div className="alert alert-info">You can retry in {cooldownSeconds} second(s).</div>}
        {!result.isPassed && cooldownSeconds === 0 && <button className="btn btn-primary" onClick={() => { setResult(null); setAnswers({}); setCurrentQuestionIndex(0); }}>Retry quiz</button>}
        {result.isPassed && <a className="btn btn-success" href="/dashboard/student/courses">Continue learning</a>}
      </div></div>
    );
  }

  return (
    <div className="card shadow-sm"><div className="card-header d-flex justify-content-between"><span>Question {currentQuestionIndex + 1} of {questions.length}</span><span>{currentQuestion.multi ? 'Select all that apply' : 'Select one answer'}</span></div><div className="card-body">
      {cooldownSeconds > 0 && <div className="alert alert-info">Please wait {cooldownSeconds} second(s) before retrying.</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <h5 className="card-title mb-4">{currentQuestion.question}</h5>
      <div className="list-group mb-4">{currentQuestion.propositions.map((proposition) => <label key={proposition.index} className={`list-group-item list-group-item-action ${selected.includes(proposition.index) ? 'active' : ''}`}><input className="me-2" type={currentQuestion.multi ? 'checkbox' : 'radio'} name={`question-${currentQuestion.id}`} checked={selected.includes(proposition.index)} disabled={cooldownSeconds > 0} onChange={() => toggleAnswer(proposition.index)} />{proposition.content}</label>)}</div>
      <div className="d-flex justify-content-between"><button className="btn btn-outline-secondary" onClick={() => setCurrentQuestionIndex((index) => index - 1)} disabled={currentQuestionIndex === 0}>Previous</button>{currentQuestionIndex === questions.length - 1 ? <button className="btn btn-success" onClick={submit} disabled={isSubmitting || cooldownSeconds > 0 || Object.keys(answers).length < questions.length}>{isSubmitting ? 'Submitting…' : 'Submit quiz'}</button> : <button className="btn btn-primary" onClick={() => setCurrentQuestionIndex((index) => index + 1)} disabled={selected.length === 0}>Next</button>}</div>
    </div></div>
  );
}
