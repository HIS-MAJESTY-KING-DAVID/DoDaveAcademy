import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Exams{% endblock %}

{% block actionBtn %}
	<a href="{path('app_admin_formation_new')}" className="btn btn-sm btn-primary mb-0">Add new formation</a>
{% endblock %}

{% block mainContent %}
    <div className="card bg-transparent border">
        <!-- Card body START -->
        <div className="card-body">
            <table className="table">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{formation.name}</td>
                    </tr>
                    <tr>
                        <th>Slug</th>
                        <td>{formation.slug}</td>
                    </tr>
                    <tr>
                        <th>Durée</th>
                        <td>{formation.duree}</td>
                    </tr>
                    <tr>
                        <th>Niveau de difficulté</th>
                        <td>{formation.niveauDifficulte}</td>
                    </tr>
                    <tr>
                        <th>Formation Gratuite</th>
                        <td>{formation.isFree ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <th>Date de création</th>
                        <td>{formation.createdAt ? formation.createdAt|date('Y-m-d H:i:s') : ''}</td>
                    </tr>
                    <tr>
                        <th>Déjà publiée</th>
                        <td>{formation.isPublished ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                    </tr>
                    <tr>
                        <td colspan="2">{formation.description|raw}</td>
                    </tr>
                    <tr>
                        <th>Liste des cours associés</th>
                    </tr>
                    {% for cours in formation.cours %}
                        <tr>
                            <td colspan="2">
                                <h5><a href="">{cours.intitule}</a></h5>
                                <b className="badge badge-info">Prof : {cours.prof}</b>
                                <b className="badge badge-danger">Niveau de difficulté : {cours.niveauDifficulte}</b>
                                <b className="badge badge-success">Durée d'apprentissage: {cours.dureeApprentissage}</b>
                            </td>
                        </tr>
                    
))}
                </tbody>
            </table>    
        </div>
    </div>

{% endblock %}

    </>
  );
}
