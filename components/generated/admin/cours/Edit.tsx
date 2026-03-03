import React from 'react';
import Link from 'next/link';

export default function Edit(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %} | Cours{% endblock %}

{% block pageTitle %}Cours{% endblock %}

{% block cardTitle %}Edition{% endblock %}

{% block cardFooter %}
    <a className="btn btn-app" href="{path('app_cours_index')}">
        <i className="fas fa-plus"></i> Liste
    </a>
    {include('includes/_delete_form.html.twig', {path: path('app_cours_delete', {'id': cour.id}), token: csrf_token('delete' ~ cour.id), classes: 'btn-danger'})}
{% endblock %}

{% block body %}

    <div className="row">
        <div className="col-md-9">
            {include('cours/_form.html.twig', {'button_label': 'Enregistrer les modifications'})}
        </div>
    </div>

{% endblock %}

    </>
  );
}
