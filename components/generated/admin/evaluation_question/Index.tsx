import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Evaluations{% endblock %}

{% block actionBtn %}
	<a href="{url('app_admin_evaluation_question_new', {'slug': evaluation.slug})}" className="btn btn-primary-soft">Ajouter une question</a>
{% endblock %}

{% block script %}
    
{% endblock %}

{% block mainContent %}
    {include("admin/evaluation_question/_questions.html.twig")}
{% endblock %}

    </>
  );
}
