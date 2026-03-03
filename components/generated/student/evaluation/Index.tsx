import React from 'react';
import Link from 'next/link';

interface Evaluation {
  id: number;
  slug: string;
  titre: string;
  duree: number;
  startAt: string;
  endAt: string;
  matiere: {
    name: string;
  };
}

interface EvaluationResult {
  evaluation: {
    id: number;
  };
}

interface Student {
  evaluations: Evaluation[];
  evaluationResultats: EvaluationResult[];
}

interface IndexProps {
  student: Student;
}

export default function Index({ student }: IndexProps) {
  const checkHasDone = (evaluation: Evaluation) => {
    return student.evaluationResultats?.some(
      item => item.evaluation?.id === evaluation.id
    );
  };

  return (
    <div className="card bg-transparent border rounded-3">
      {/* Card body START */}
      <div className="card-body">
        {/* Course list table START */}
        <div className="table-responsive border-0">
          <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
            {/* Table head */}
            <thead>
              <tr>
                <th scope="col" className="border-0 rounded-start">Titre</th>
                <th scope="col" className="border-0">Matière</th>
                <th scope="col" className="border-0">Durée</th>
                <th scope="col" className="border-0">Date début</th>
                <th scope="col" className="border-0">Date fin</th>
                <th scope="col" className="border-0">Satut</th>
                <th scope="col" className="border-0 rounded-end">Action</th>
              </tr>
            </thead>

            {/* Table body START */}
            <tbody>
              {student?.evaluations && student.evaluations.length > 0 ? (
                student.evaluations.map((evaluation) => {
                  const hasDone = checkHasDone(evaluation);
                  const status = hasDone ? 'déjà' : 'en attente...';

                  return (
                    <tr key={evaluation.id}>
                      {/* Table data */}
                      <td>{evaluation.titre}</td>

                      {/* Table data */}
                      <td>{evaluation.matiere.name}</td>

                      {/* Table data */}
                      <td>{evaluation.duree}</td>

                      {/* Table data */}
                      <td>{new Date(evaluation.startAt).toLocaleString('fr-FR')}</td>
                      <td>{new Date(evaluation.endAt).toLocaleString('fr-FR')}</td>
                      <td>{status}</td>
                      <td>
                        {!hasDone ? (
                          <Link href={`/evaluation/${evaluation.slug}/begin`} className="btn btn-success-soft btn-xs">
                            commencer
                          </Link>
                        ) : (
                          <Link href={`/evaluation/${evaluation.slug}/result`} className="btn btn-primary-soft btn-xs">
                            resultat
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7}>Liste vide</td>
                </tr>
              )}
            </tbody>
            {/* Table body END */}
          </table>
        </div>
        {/* Course list table END */}
      </div>
      {/* Card body START */}
    </div>
  );
}
