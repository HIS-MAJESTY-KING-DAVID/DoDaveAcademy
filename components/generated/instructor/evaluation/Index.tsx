import React from 'react';
import Link from 'next/link';

interface Evaluation {
  id: number;
  slug: string;
  titre: string;
  description: string;
  startAt: string;
  endAt: string;
  duree: number;
  isGeneratedRandomQuestions: boolean;
  evaluationQuestions: any[];
  isPassed: boolean;
}

interface IndexProps {
  evaluations: Evaluation[];
}

export default function Index({ evaluations }: IndexProps) {
  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Link href="/admin/evaluation/new" className="btn btn-primary-soft">
          Create new
        </Link>
      </div>

      <div className="table-responsive border-0 rounded-3">
        {/* Table START */}
        <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Duree</th>
              <th>Type de questionnaire</th>
              <th>Nombre de questions</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {evaluations && evaluations.length > 0 ? (
              evaluations.map((evaluation) => (
                <tr key={evaluation.id} className={evaluation.isPassed ? "bg-danger bg-opacity-10" : ""}>
                  <td>{evaluation.titre.length > 45 ? evaluation.titre.substring(0, 45) + '...' : evaluation.titre}</td>
                  <td>{evaluation.description.length > 50 ? evaluation.description.substring(0, 50) + '...' : evaluation.description}</td>
                  <td>{evaluation.startAt ? new Date(evaluation.startAt).toLocaleString() : ''}</td>
                  <td>{evaluation.endAt ? new Date(evaluation.endAt).toLocaleString() : ''}</td>
                  <td>{evaluation.duree}</td>
                  <td>{evaluation.isGeneratedRandomQuestions ? 'Aléatoire' : 'Epreuve Unique'}</td>
                  <td>
                    {!evaluation.isGeneratedRandomQuestions ? (
                      <>
                        {evaluation.evaluationQuestions?.length || 0}
                        <Link href={`/admin/evaluation/${evaluation.slug}/questions`} className="ms-2">Questions</Link>
                      </>
                    ) : (
                      <span>Aléatoire</span>
                    )}
                  </td>
                  <td>
                    <Link className="btn btn-sm btn-primary me-1" href={`/admin/evaluation/${evaluation.id}`}>Voir</Link>
                    {!evaluation.isPassed && (
                      <Link className="btn btn-sm btn-primary" href={`/admin/evaluation/${evaluation.id}/edit`}>Modifier</Link>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>Liste vide</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
