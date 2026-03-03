import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'instructor/base.html.twig' %}

{% block pageTitle %}Evaluations{% endblock %}

{% block actionBtn %}
    <a className="btn btn-primary-soft" href="{path('app_admin_evaluation_index')}">Retour</a>
	<a className="btn btn-success-soft" href="{path('app_admin_evaluation_new')}">Nouvelle Evaluation</a>
    {not evaluation.isPassed && (

        <a className="btn btn-warning-soft" href="{path('app_admin_evaluation_edit', {'id': evaluation.id})}">Modifier</a>
        <div className="d-inline">{include('instructor/evaluation/_delete_form.html.twig')}</div>
    
)}
    
	<a data-bs-toggle="modal" data-bs-target="#modal-liste-candidats" className="btn btn-secondary-soft" href="#">Liste de candidats</a>
{% endblock %}

{% block script %}
    
{% endblock %}

{% block pageContent %}


    <table className="table">
        <tbody>
            <tr>
                <th>Titre</th>
                <td>{evaluation.titre}</td>
            </tr>
            <tr>
                <th>Description</th>
                <td>{evaluation.description}</td>
            </tr>
            <tr>
                <th>Matière</th>
                <td>{evaluation.matiere.name}</td>
            </tr>
            <tr>
                <th>Classes</th>
                <td>
                    {% for classe in evaluation.classes %}
                        <span className="badge badge-info bg-success">{classe.name}</span>
                    
))}
                </td>
            </tr>
            <tr>
                <th>Début de l'évaluation</th>
                <td>{evaluation.startAt ? evaluation.startAt|date('Y-m-d H:i:s') : ''}</td>
            </tr>
            <tr>
                <th>Fin de l'évaluation</th>
                <td>{evaluation.endAt ? evaluation.endAt|date('Y-m-d H:i:s') : ''}</td>
            </tr>
            <tr>
                <th>Durée</th>
                <td>{evaluation.duree ~ ' Heures'}</td>
            </tr>
            <tr>
                <th>Type de questionnaire</th>
                <td>{evaluation.isGeneratedRandomQuestions ? 'Aléatoire' : 'Epreuve unique'}</td>
            </tr>
        </tbody>
    </table>
    {evaluation.evaluationQuestions is not empty && (

        {include("instructor/evaluation_question/_questions.html.twig", {'evaluation_questions': evaluation.evaluationQuestions})}
    
)}


    <!-- Popup modal for reviwe START -->
    <div className="modal fade" id="modal-liste-candidats" tabindex="-1" aria-labelledby="viewReviewLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
            <div className="modal-content">
                <!-- Modal header -->
                <div className="modal-header bg-dark">
                    <h5 className="modal-title text-white" id="viewReviewLabel">Candidats</h5>
                    <button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                </div>
                <!-- Modal body -->
                <div className="modal-body g-3">
                    <div className="row g-4">
                        <ul className="nav nav-pills nav-pills-bg-soft justify-content-sm-center mb-4 px-3" id="course-pills-tab" role="tablist">
                            <!-- Tab item -->
                            <li className="nav-item me-2 me-sm-5">
                                <button className="nav-link mb-2 mb-md-0 active" id="candidats-list" data-bs-toggle="pill" data-bs-target="#candidats-list-tab" type="button" role="tab" aria-controls="candidats-list-tab" aria-selected="false">Liste de candidats</button>
                            </li>
                            <li className="nav-item me-2 me-sm-5">
                                <button className="nav-link mb-2 mb-md-0" id="notes" data-bs-toggle="pill" data-bs-target="#notes-tab" type="button" role="tab" aria-controls="notes-tab" aria-selected="false">Notes</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="course-pills-tabContent">
                            <div className="tab-pane fade show active" id="candidats-list-tab" role="tabpanel" aria-labelledby="candidats-list">
                                <div className="row g-4">
                                    <div className="table-responsive border-0">
                                        <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                                            <!-- Table head -->
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="border-0 rounded-start">#</th>
                                                    <th scope="col" className="border-0">Nom & Prénom</th>
                                                    <th scope="col" className="border-0">Date naissance</th>
                                                    <th scope="col" className="border-0">Lieu de naissance</th>
                                                    <th scope="col" className="border-0">Classe</th>
                                                    <th scope="col" className="border-0">Etablissement</th>
                                                    <th scope="col" className="border-0 rounded-end">Action</th>
                                                </tr>
                                            </thead>

                                            <!-- Table body START -->
                                            <tbody>
                                                {% for eleve in evaluation.eleves %}
                                                    <tr>
                                                        <td>{loop.index}</td>
                                                        <td>
                                                            <div className="d-flex align-items-center position-relative">
                                                                <!-- Image -->
                                                                <div className="w-60px">
                                                                    <img src="{asset(eleve.utilisateur.personne.avatarPath)}" className="rounded-circle" alt="" />
                                                                </div>
                                                                <h6 className="table-responsive-title mb-0 ms-2">	
                                                                    <a href="" className="stretched-link">{eleve.utilisateur.personne.nomComplet|u.truncate(40, '.')}</a>
                                                                </h6>
                                                            </div>
                                                        </td>
                                                        <td>{eleve.utilisateur.personne.bornAt|date("d/m/Y")}</td>
                                                        <td>{eleve.utilisateur.personne.lieuNaissance}</td>
                                                        <td>{eleve.classe.name}</td>
                                                        <td>{eleve.etablissement is not same as null ? eleve.etablissement.name : '--------------'}</td>
                                                        <td></td>
                                                    </tr>
                                                
) || (

                                                    <tr>
                                                        <td colspan="7">Aucun inscris pour le moment</td>
                                                    </tr>
                                                
))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>  
                            </div>
                            <div className="tab-pane fade show" id="notes-tab" role="tabpanel" aria-labelledby="notes">
                                <div className="row g-4">
                                    <div className="table-responsive border-0">
                                        <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                                            <!-- Table head -->
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="border-0 rounded-en">Nom & Prénom</th>
                                                    <th scope="col" className="border-0">Date naissance</th>
                                                    <th scope="col" className="border-0">Classe</th>
                                                    <th scope="col" className="border-0">Etablissement</th>
                                                    <th scope="col" className="border-0d">Note Obtenue / 20</th>
                                                    <th scope="col" className="border-0 rounded-end">Rang</th>
                                                </tr>
                                            </thead>

                                            <!-- Table body START -->
                                            <tbody>
                                                {resultats.map(item => (

                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center position-relative">
                                                                <!-- Image -->
                                                                <div className="w-60px">
                                                                    <img src="{asset(item.eleve.utilisateur.personne.avatarPath)}" className="rounded-circle" alt="" />
                                                                </div>
                                                                <h6 className="table-responsive-title mb-0 ms-2">	
                                                                    <a href="" className="stretched-link">{item.eleve.utilisateur.personne.nomComplet|u.truncate(40, '.')}</a>
                                                                </h6>
                                                            </div>
                                                        </td>
                                                        <td>{item.eleve.utilisateur.personne.bornAt|date("d/m/Y")}</td>
                                                        <td>{item.eleve.classe.name}</td>
                                                        <td>{item.eleve.etablissement is not same as null ? item.eleve.etablissement.name : '--------------'}</td>
                                                        <td>{item.noteObtenue}</td>
                                                        <td>{loop.index is same as 1 ? '1er(e)' : loop.index ~ 'ème'}</td>
                                                    </tr>
                                                
) || (

                                                    <tr>
                                                        <td colspan="6">En attente...</td>
                                                    </tr>
                                                
))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Modal footer -->
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger-soft my-0" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Popup modal for reviwe END -->

{% endblock %}

    </>
  );
}
