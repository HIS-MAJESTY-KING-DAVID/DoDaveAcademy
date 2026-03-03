import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Exams{% endblock %}

{% block actionBtn %}
	<a href="{path('app_admin_formation_new')}" className="btn btn-sm btn-primary mb-0">Add new formation</a>
{% endblock %}

{% block mainContent %}
    <!-- Card START -->
	<div className="card bg-transparent border">
        <!-- Card body START -->
		<div className="card-body">
			<!-- Course table START -->
			<div className="table-responsive border-0 rounded-3">

                <table className="table">
                    <thead>
                        <tr>
                            <th>Intitulé</th>
                            <th>Durée</th>
                            <th>Niveau de difficulté</th>
                            <th>Gratuite</th>
                            <th>Date de création</th>
                            <th>Publié</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {formations.map(formation => (

                        <tr>
                            <td>{formation.name}</td>
                            <td>{formation.duree}</td>
                            <td>{formation.niveauDifficulte}</td>
                            <td>{formation.isFree ? 'Yes' : 'No'}</td>
                            <td>{formation.createdAt ? formation.createdAt|date('Y-m-d H:i:s') : ''}</td>
                            <td>{formation.isPublished ? 'Yes' : 'No'}</td>
                            <td>
                                <a className="btn btn-xs btn-primary" href="{path('app_admin_formation_show', {'id': formation.id})}">détails</a>
                                <a className="btn btn-xs btn-warning" href="{path('app_admin_formation_edit', {'id': formation.id})}">éditer</a>
                            </td>
                        </tr>
                    
) || (

                        <tr>
                            <td colspan="10">no records found</td>
                        </tr>
                    
))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
{% endblock %}

    </>
  );
}
