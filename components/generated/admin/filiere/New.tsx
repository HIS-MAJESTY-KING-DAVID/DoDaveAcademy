import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %} | Filières {% endblock %}

{% block pageTitle %}Filières{% endblock %}

{% block cardTitle %}Nouveau{% endblock %}

{% block cardFooter %}
    <a className="btn btn-app" href="{path('app_filiere_index')}" >
        <i className="fas fa-arrow-left"></i> Liste
    </a>
{% endblock %}

{% block body %}

    <div className="row">
        <div className="col-md-6">
            {include('filiere/_form.html.twig')}
        </div>
    </div>

{% endblock %}

    </>
  );
}
