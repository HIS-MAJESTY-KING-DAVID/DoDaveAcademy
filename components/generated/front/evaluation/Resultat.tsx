import React from 'react';
import Link from 'next/link';

export default function Resultat(props: any) {
  return (
    <>
{% extends "front/base.html.twig" %}

{% block title %} - Test de connaissance{% endblock %}

{% block mainBarnner %}

{% endblock %}

{% block mainContent %}

    <section className="pt-0">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {% for msg in app.flashes('infoEvaluation') %}
                        <div className="col-12">
                            <div className="alert alert-info text-center">
                                {msg}
                            </div>
                        </div>
                    
))}
                </div>
                <div className="col-12 alert alert-success">
                    <div className="d-flex">
                        <div style="width: 100%">
                            <h2>Correction</h2>
                            <h3>{evaluation.titre}</h3>
                            <p>{evaluation.description}</p>
                            <div className="d-flex">
                                <p>Matière : {evaluation.matiere.name}</p>
                                <p>Durée : {evaluation.duree} heures</p>
                                <p>Temps Restant : <b>01h : 55min</b></p>
                            </div>
                        </div>
                        <div>
                            <div className="bg-danger text-white" style="width: 150px;height:150px;border-radius:50%;text-align:center;padding-top:30px;font-size:2em">
                                <span>{noteObtenue|number_format('2', ',')}</span>
                                <hr style="width:70%;margin:auto" />
                                <span>20</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-12">
                    <!-- Course item START -->
                    <div className="card border">
                        <div className="card-body">
                            {resultats.map(item => (

                                <div className="{item.isCorrect ? 'border-success' : 'bg-danger text-white'} p-2 mb-2">
                                    <div className="d-flex">
                                        <h5 style="margin-right: 10px">{loop.index} - </h5>
                                        <div>{item.quiz.question|raw}</div>
                                    </div>
                                    <ul>
                                        <li className="d-flex">
                                            <div className="m-2">
                                                {% set value = 1 %}
                                                {value in item.quiz.propositionJuste && (

                                                    <span className="fas fa-check text-success"></span>
                                                
) || (

                                                    {value in item.reponses && (

                                                        <span className="fas fa-times text-red"></span>
                                                    
)}
                                                
)}
                                                
                                                <input {value in item.reponses ? 'checked' : ''} type="{item.quiz.propositionJuste|length  /> 1 ? 'checkbox' : 'radio'}" disabled="true">
                                            </div>
                                            <div className="m-2">{item.quiz.proposition1|raw}</div>
                                        </li>
                                        <li className="d-flex">
                                            <div className="m-2">
                                                {% set value = 2 %}
                                                {value in item.quiz.propositionJuste && (

                                                    <span className="fas fa-check text-success"></span>
                                                
) || (

                                                    {value in item.reponses && (

                                                        <span className="fas fa-times text-red"></span>
                                                    
)}
                                                
)}
                                                <input {value in item.reponses ? 'checked' : ''} type="{item.quiz.propositionJuste|length  /> 1 ? 'checkbox' : 'radio'}" disabled="true">
                                            </div>
                                            <div className="m-2">{item.quiz.proposition2|raw}</div>
                                        </li>
                                        <li className="d-flex">
                                            <div className="m-2">
                                                {% set value = 3 %}
                                                {value in item.quiz.propositionJuste && (

                                                    <span className="fas fa-check text-success"></span>
                                                
) || (

                                                    {value in item.reponses && (

                                                        <span className="fas fa-times text-red"></span>
                                                    
)}
                                                
)}
                                                <input {value in item.reponses ? 'checked' : ''} type="{item.quiz.propositionJuste|length  /> 1 ? 'checkbox' : 'radio'}" disabled="true">
                                            </div>
                                            <div className="m-2">{item.quiz.proposition3|raw}</div>
                                        </li>
                                        <li className="d-flex">
                                            <div className="m-2">
                                                {% set value = 4 %}
                                                {value in item.quiz.propositionJuste && (

                                                    <span className="fas fa-check text-success"></span>
                                                
) || (

                                                    {value in item.reponses && (

                                                        <span className="fas fa-times text-red"></span>
                                                    
)}
                                                
)}
                                                <input {value in item.reponses ? 'checked' : ''} type="{item.quiz.propositionJuste|length  /> 1 ? 'checkbox' : 'radio'}" disabled="true">
                                            </div>
                                            <div className="m-2">{item.quiz.proposition4|raw}</div>
                                        </li>
                                    </ul>
                                </div>
                            
))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

{% endblock %}
    </>
  );
}
