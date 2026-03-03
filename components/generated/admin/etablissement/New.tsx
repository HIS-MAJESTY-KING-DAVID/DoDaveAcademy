import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %} | Etablissements{% endblock %}

{% block pageTitle %}Enseignants{% endblock %}

{% block cardTitle %}Nouveau{% endblock %}

{% block cardFooter %}
    <a className="btn btn-app" href="{path('app_etablissement_index')}">
        <i className="fas fa-plus"></i> Nouveau
    </a>
{% endblock %}

{% block body %}

    <div className="row">
        <div className="col-6">
            {include('etablissement/_form.html.twig')}
        </div>
    </div>

{% endblock %}

    </>
  );
}
