import React from 'react';
import Link from 'next/link';

export default function Edit(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Evaluations{% endblock %}

{% block actionBtn %}
    <a href="{path('app_admin_evaluation_index')}" className="btn btn-secondary">Retour</a>
	<a href="{path('app_admin_evaluation_new')}" className="btn btn-primary">Create new</a>
    {include('admin/evaluation/_delete_form.html.twig')}
{% endblock %}

{% block script %}
    
{% endblock %}

{% block mainContent %}
    {include('admin/evaluation/_form.html.twig', {'button_label': 'Enregistrer et Programmer'})}

{% endblock %}

    </>
  );
}
