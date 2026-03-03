import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}
{% block pageTitle %}
    Evaluations
    
{% endblock %}
{% block actionBtn %}
    <a className="btn btn-primary-soft" href="{path('app_admin_evaluation_new')}">
        Create new
            
    </a>
{% endblock %}
{% block script %}{% endblock %}
{% block mainContent %}
    <div className="table-responsive border-0 rounded-3">
        <!-- Table START -->
        <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
            <thead>
                <tr>
                    <th>
                        Titre
                                            
                    </th>
                    <th>
                        Examinateur
                                            
                    </th>
                    <th>
                        Début
                                            
                    </th>
                    <th>
                        Fin
                                            
                    </th>
                    <th>
                        Duree
                                            
                    </th>
                    <th>
                        Type de questionnaire
                                            
                    </th>
                    <th>
                        Nombre de questions
                                            
                    </th>
                    <th>
                        actions
                                            
                    </th>
                </tr>
            </thead>
            <tbody>
                {evaluations.map(evaluation => (

                    <tr class='{evaluation.isPassed ? "bg-danger" : ""}'>
                        <td>
                            {evaluation.titre|u.truncate(45, '...')}
                        </td>
                        {evaluation.enseignant is not null and evaluation.enseignant.utilisateur is not null && (

                            <td>
                                {evaluation.enseignant.utilisateur.personne.lastName}
                            </td>
                        
) || (

                            <td>
                                (Not set)
                                                            
                            </td>
                        
)}
                        
                        <td>
                            {evaluation.startAt ? evaluation.startAt|date('Y-m-d H:i:s') : ''}
                        </td>
                        <td>
                            {evaluation.endAt ? evaluation.endAt|date('Y-m-d H:i:s') : ''}
                        </td>
                        <td>
                            {evaluation.duree}
                        </td>
                        <td>
                            {evaluation.isGeneratedRandomQuestions ? 'Aléatoire' : 'Epreuve Unique'}
                        </td>
                        <td>
                            {not evaluation.isGeneratedRandomQuestions && (

                                {evaluation.evaluationQuestions|length}
                                <a href="{url('app_admin_evaluation_question_index', {'slug': evaluation.slug})}" className="">
                                    Questions
                                                                    
                                </a>
                            
) || (

                                <span>
                                    Aléatoire
                                                                    
                                </span>
                            
)}
                        </td>
                        <td>
                            <a className="btn btn-primary" href="{path('app_admin_evaluation_show', {'id': evaluation.id})}">
                                Voir
                                                            
                            </a>
                            {not evaluation.isPassed && (

                                {not evaluation.isPublished && (

                                    <a className="btn btn-secondary" href="{path('app_admin_evaluation_edit', {'id': evaluation.id})}">
                                        Programmer
                                                                        
                                    </a>
                                
)}
                                {evaluation.isPublished && (

                                    <a className="btn btn-success">
                                        En cours
                                                                    
                                    </a>
                                
)}
                            
)}
                        </td>
                    </tr>
                
) || (

                    <tr>
                        <td colspan="8">
                            Liste vide
                                                    
                        </td>
                    </tr>
                
))}
            </tbody>
        </table>
    </div>
{% endblock %}

    </>
  );
}
