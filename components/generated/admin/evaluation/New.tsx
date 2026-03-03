import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Evaluations{% endblock %}

{% block actionBtn %}
	<a href="{path('app_admin_evaluation_index')}" className="btn btn-warning-soft">Retour</a>
{% endblock %}

{% block script %}
    
{% endblock %}

{% block mainContent %}

    {include('admin/evaluation/_form.html.twig')}

{% endblock %}

    </>
  );
}
