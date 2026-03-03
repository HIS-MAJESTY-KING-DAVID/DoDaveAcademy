import React from 'react';
import Link from 'next/link';

export default function Epreuve(props: any) {
  return (
    <>
{% set dontShowAnnonces = true %}
{% extends "front/base.html.twig" %}

{% block title %} - Test de connaissance{% endblock %}

{% block mainBarnner %}

{% endblock %}

{% block mainContent %}

     <!-- =======================
    Page content START -->
    <section className="pt-0">
        <div className="container">
            <div className="row">
                <!-- Main content START -->
                <div className="col-12 alert alert-success">
                    <h3>{evaluation.titre}</h3>
                    <p>{evaluation.description|raw}</p>
                    <div className="d-flex">
                        <p>Matière : {evaluation.matiere.name}</p>
                        <p>Durée : {evaluation.duree} heures</p>
                        <p>Temps Restant : <b>01h : 55min</b></p>
                    </div>
                </div>
                <div className="col-xl-12">
                    <!-- Course item START -->
                    <div className="card border">
                        <div className="card-body">
                            
                            {not evaluation.isGeneratedRandomQuestions && (

                                {include('front/evaluation/_epreuve_unique.html.twig', {'epreuve': epreuve})}
                            
) || (

                                {include('front/evaluation/_epreuve_random.html.twig', {'epreuve': epreuve})}
                            
)}

                        </div>
                        
                    </div>
                    <!-- Course item END -->

                </div>
                <!-- Main content END -->

            </div> <!-- Row END -->
        </div>	
    </section>
    <!-- =======================
    Page content END -->

{% endblock %}
    </>
  );
}
