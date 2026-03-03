import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends 'instructor/base.html.twig' %}

{% block pageTitle %}Evaluations{% endblock %}

{% block actionBtn %}
	<a href="{path('app_admin_evaluation_index')}" className="btn btn-warning-soft">Retour</a>
{% endblock %}

{% block script %}
    
{% endblock %}

{% block pageContent %}

    {include('instructor/evaluation/_form.html.twig')}

{% endblock %}

    </>
  );
}
