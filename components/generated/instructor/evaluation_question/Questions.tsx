import React from 'react';
import Link from 'next/link';

interface QuestionsProps {
  evaluation_questions: any[];
}

export default function Questions({ evaluation_questions }: QuestionsProps) {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      console.log('Delete question', id);
    }
  };

  return (
    <div className="card border bg-transparent rounded-3">
      <div className="card-body p-4">
        <div className="accordion accordion-icon accordion-bg-light" id="accordionExample">
          {evaluation_questions && evaluation_questions.length > 0 ? (
            evaluation_questions.map((evaluation_question, index) => {
              const cmp = index + 1;
              return (
                <div className="accordion-item mb-3" key={evaluation_question.id}>
                  <h6 className="accordion-header" id={`headingOne${evaluation_question.id}`}>
                    <button 
                      className="accordion-button rounded collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target={`#collapseOne${evaluation_question.id}`} 
                      aria-expanded="false" 
                      aria-controls={`collapseOne${evaluation_question.id}`}
                    >
                      <span className="text-secondary fw-bold me-3">{cmp < 10 ? '0' + cmp : cmp}</span>  
                      <span className="fw-bold" dangerouslySetInnerHTML={{ __html: evaluation_question.question }}></span> 
                    </button>
                  </h6>
                  <div 
                    id={`collapseOne${evaluation_question.id}`} 
                    className="accordion-collapse collapse" 
                    aria-labelledby={`headingOne${evaluation_question.id}`} 
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body mt-3">
                      {/* Answer options */}
                      <p className="mb-3"><b className="text-dark">A</b> <span dangerouslySetInnerHTML={{ __html: evaluation_question.proposition1 }} /></p>
                      <hr />
                      <p className="mb-3"><b className="text-dark">B</b> <span dangerouslySetInnerHTML={{ __html: evaluation_question.proposition2 }} /></p>
                      <hr />
                      <p className="mb-3"><b className="text-dark">C</b> <span dangerouslySetInnerHTML={{ __html: evaluation_question.proposition3 }} /></p>
                      <hr />
                      <p className="mb-3"><b className="text-dark">D</b> <span dangerouslySetInnerHTML={{ __html: evaluation_question.proposition4 }} /></p>
                      {/* Button */}
                      {!evaluation_question.evaluation?.isPassed && (
                        <>
                          <Link href={`/admin/evaluation/question/${evaluation_question.id}/edit`} className="btn btn-sm btn-warning-soft mb-0 me-1">modifier</Link>
                          <button 
                            className="btn btn-sm btn-danger-soft mb-0"
                            onClick={() => handleDelete(evaluation_question.id)}
                          >
                            supprimer
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <hr />
              <h1>Liste vide</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
