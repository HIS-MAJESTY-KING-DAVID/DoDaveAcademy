import React from 'react';
import Link from 'next/link';

export default function Edit(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %} | Chapitres{% endblock %}

{% block pageTitle %}Chapitres{% endblock %}

{% block cardTitle %}Editer{% endblock %}

{% block cardFooter %}
    <a className="btn btn-app" href="{path('app_chapitre_index', {coursId: chapitre.cours.id})}">
        <i className="fas fa-plus"></i> Liste
    </a>
    {include('includes/_delete_form.html.twig', {path: path('app_chapitre_delete', {'id': chapitre.id}), token: csrf_token('delete' ~ chapitre.id), classes: 'btn-danger'})}
{% endblock %}

{% block body %}

    <div className="row">
        <div className="col-md-8">
            {include('chapitre/_form.html.twig', {'button_label': 'Update'})}
        </div>
        <div className="md-col-4">
            <h5>Liste des leçons</h5>
            <ul>
                {% for lesson in chapitre.lessons %}
                    <li>
                        <a href="">
                            {lesson.title}
                        </a>
                    </li>
                
) || (

                    <li>
                        Aucune leçon trouvée !
                    </li>    
                
))}
            </ul>
            <a href="" className="btn btn-outline-primary">Ajouter une leçon</a>
        </div>
    </div>

{% endblock %}

    </>
  );
}
