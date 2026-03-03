import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Ajouter une sous-système scolaire{% endblock %}

{% block pageTitle %}Sous-systèmes scolaire{% endblock %}

{% block cardTitle %}Ajout{% endblock %}

{% block cardFooter %}
    <a className="btn btn-app" href="{path('app_sous_systeme_index')}">
        <i className="fas fa-arrow-left"></i> Liste
    </a>
{% endblock %}

{% block body %}

    <div className="row">
        <div className="col-md-6">
            {include('sous_systeme/_form.html.twig')}
        </div>
    </div>

{% endblock %}

    </>
  );
}
