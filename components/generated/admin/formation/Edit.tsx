import React from 'react';
import Link from 'next/link';

export default function Edit(props: any) {
  return (
    <>
{% extends 'admin/formation/index.html.twig' %}

{% block actionBtn %}
	<a href="{path('app_admin_formation_index')}" className="btn btn-sm btn-primary mb-0">Retour</a>
    <a className="btn btn-app" href="{path('app_formation_index')}">
        <i className="fas fa-arrow-left"></i> Liste
    </a>
    {include('includes/_delete_form.html.twig', {path: path('app_formation_delete', {'id': formation.id}), token: csrf_token('delete' ~ formation.id), classes: 'btn-danger'})}
{% endblock %}

{% block mainContent %}

    <div className="row">
        <div className="col-md-9">
            {include('formation/_form.html.twig', {'button_label': 'Enregistrer les modifications'})}
        </div>
    </div>
    
{% endblock %}

    </>
  );
}
