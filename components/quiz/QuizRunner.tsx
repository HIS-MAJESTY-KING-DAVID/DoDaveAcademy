'use client';

import { useState } from 'react';

interface Question {
    id: number;
    question: string;
    propositions: string[];
}

interface QuizRunnerProps {
    questions: Question[];
    chapterId: number;
}

export default function QuizRunner({ questions, chapterId }: QuizRunnerProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [result, setResult] = useState<{ score: number, total: number } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswer = (answer: string) => {
        setAnswers({ ...answers, [currentQuestion.id]: answer });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/student/quiz-attempt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chapterId,
                    answers // Record<questionId, answerString>
                })
            });
            const data = await res.json();
            setResult(data);
        } catch (error) {
            console.error('Quiz submit error', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (result) {
        return (
            <div className="card text-center">
                <div className="card-body">
                    <h3 className="card-title">Quiz Completed!</h3>
                    <p className="display-4">{result.score} / {result.total}</p>
                    <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            </div>
            <div className="card-body">
                <h5 className="card-title mb-4">{currentQuestion.question}</h5>
                <div className="list-group mb-4">
                    {currentQuestion.propositions.map((prop, idx) => (
                        <button
                            key={idx}
                            type="button"
                            className={`list-group-item list-group-item-action ${answers[currentQuestion.id] === prop ? 'active' : ''}`}
                            onClick={() => handleAnswer(prop)}
                        >
                            {prop}
                        </button>
                    ))}
                </div>
                
                <div className="d-flex justify-content-between">
                    <button 
                        className="btn btn-outline-secondary" 
                        onClick={handlePrev} 
                        disabled={currentQuestionIndex === 0}
                    >
                        Previous
                    </button>
                    
                    {currentQuestionIndex === questions.length - 1 ? (
                        <button 
                            className="btn btn-success" 
                            onClick={handleSubmit}
                            disabled={isSubmitting || Object.keys(answers).length < questions.length}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                        </button>
                    ) : (
                        <button 
                            className="btn btn-primary" 
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
