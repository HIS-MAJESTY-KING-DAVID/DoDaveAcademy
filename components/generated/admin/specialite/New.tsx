import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %} | Spécialités{% endblock %}

{% block pageTitle %}Spécialités{% endblock %}

{% block cardTitle %}Ajouter{% endblock %}

{% block cardFooter %}
    <a className="btn btn-app" href="{path('app_specialite_index')}">
        <i className="fas fa-arrow-left"></i> Liste
    </a>
{% endblock %}

{% block body %}

    <div className="row">
        <div className="col-md-6">
            {include('specialite/_form.html.twig')}
        </div>
    </div>

{% endblock %}

    </>
  );
}
