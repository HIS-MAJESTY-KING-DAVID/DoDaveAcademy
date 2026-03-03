import React from 'react';
import Link from 'next/link';
import Questions from './Questions';

interface IndexProps {
  evaluation: any;
  evaluation_questions: any[];
}

export default function Index({ evaluation, evaluation_questions }: IndexProps) {
  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Link href={`/admin/evaluation/question/${evaluation.slug}/new`} className="btn btn-primary-soft">
          Ajouter une question
        </Link>
      </div>

      <Questions evaluation_questions={evaluation_questions} />
    </>
  );
}
