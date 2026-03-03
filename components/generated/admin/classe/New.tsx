import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %} | Classes{% endblock %}

{% block pageTitle %}Classes{% endblock %}

{% block cardTitle %}Ajouter{% endblock %}

{% block cardFooter %}
    <a className="btn btn-app" href="{path('app_classe_index')}">
        <i className="fas fa-plus"></i> Liste
    </a>
{% endblock %}

{% block body %}

    <div className="row">
        <div className="col-md-6">
            {include('classe/_form.html.twig')}
        </div>
    </div>
    
{% endblock %}

    </>
  );
}
