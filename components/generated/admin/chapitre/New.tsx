import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %} | Chapitres{% endblock %}

{% block pageTitle %}Chapitres{% endblock %}

{% block cardTitle %}Ajouter{% endblock %}

{% block cardFooter %}
    <a className="btn btn-app" href="{path('app_chapitre_index', {coursId: cours.id})}">
        <i className="fas fa-plus"></i> Liste
    </a>
{% endblock %}

{% block body %}

    <div className="row">
        <div className="col-md-9">
            {include('chapitre/_form.html.twig')}
        </div>
        <div className="col-md-3">

        </div>
    </div>

{% endblock %}

    </>
  );
}
