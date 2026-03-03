import React from 'react';
import Link from 'next/link';

export default function Questions(props: any) {
  return (
    <>
<div className="card border bg-transparent rounded-3">
    <div className="card-body p-4">
        <div className="accordion accordion-icon accordion-bg-light" id="accordionExample">
            {% set cmp = 1 %}
            {evaluation_questions.map(evaluation_question => (

                <div className="accordion-item mb-3">
                    <h6 className="accordion-header" id="headingOne{evaluation_question.id}">
                        <button className="accordion-button rounded" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne{evaluation_question.id}" aria-expanded="true" aria-controls="collapseOne{evaluation_question.id}">
                            <span className="text-secondary fw-bold me-3">{cmp < 10 ? '0' ~ cmp : cmp}</span>  
                            <span className="fw-bold">{evaluation_question.question|raw}</span> 
                        </button>
                    </h6>
                    <div id="collapseOne{evaluation_question.id}" className="accordion-collapse collapse" aria-labelledby="headingOne{evaluation_question.id}" data-bs-parent="#accordionExample">
                        <div className="accordion-body mt-3">
                            <!-- Answer options -->
                            <p className="mb-3"><b className="text-dark">A</b> {evaluation_question.proposition1|raw}</p>
                            <hr />
                            <p className="mb-3"><b className="text-dark">B</b> {evaluation_question.proposition2|raw}</p>
                            <hr />
                            <p className="mb-3"><b className="text-dark">C</b> {evaluation_question.proposition3|raw}</p>
                            <hr />
                            <p className="mb-3"><b className="text-dark">D</b> {evaluation_question.proposition4|raw}</p>
                            <!-- Button -->
                            {not evaluation_question.evaluation.isPassed && (

                                <a href="{url('app_admin_evaluation_question_edit', {'id': evaluation_question.id})}" className="btn btn-sm btn-warning-soft mb-0">modifier</a>
                                {include('admin/evaluation_question/_delete_form.html.twig')}
                            
)}
                        </div>
                    </div>
                </div>

                {not loop.last && (

                    <hr />
                
)}
            
) || (

                <hr />
                <h1>Liste vide</h1>
            
))}
        </div>
    </div>
</div>
    </>
  );
}
