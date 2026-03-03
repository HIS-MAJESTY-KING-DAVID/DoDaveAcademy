import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block title %} | Cours{% endblock %}

{% block pageTitle %}Cours{% endblock %}

{% block cardTitle %}Ajouter{% endblock %}

{% block cardFooter %}
    <a className="btn btn-app" href="{path('app_cours_index')}">
        <i className="fas fa-plus"></i> Ajouter
    </a>
{% endblock %}

{% block body %}

    <div className="row">
        <div className="col-md-9">
            {include('admin/cours/_form.html.twig')}
        </div>
    </div>

{% endblock %}

    </>
  );
}
