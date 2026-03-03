import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
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
    <a className="btn btn-app" href="{path('app_chapitre_edit', {'id': chapitre.id})}"><i className="fas fa-edit"></i> Editer</a>
    {include('includes/_delete_form.html.twig', {path: path('app_chapitre_delete', {'id': chapitre.id}), token: csrf_token('delete' ~ chapitre.id), classes: 'btn-danger'})}
{% endblock %}

{% block body %}

    <div className="row">
        <div className="col-md-8">
            <table className="table">
                <tbody>
                    <tr>
                        <th>Id</th>
                        <td>{chapitre.id}</td>
                    </tr>
                    <tr>
                        <th>Title</th>
                        <td>{chapitre.title}</td>
                    </tr>
                    <tr>
                        <th>Slug</th>
                        <td>{chapitre.slug}</td>
                    </tr>
                    <tr>
                        <th colspan="2" className="bg-dark">Objectifs</th>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div>
                                {chapitre.objectifs|raw}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2" className="bg-dark">Description</th>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div>
                                {chapitre.description|raw}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="col-md-4">
            <h5>Liste des leçons</h5>
            <hr />
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
