import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends 'admin/formation/index.html.twig' %}

{% block actionBtn %}
	<a href="{path('app_admin_formation_index')}" className="btn btn-sm btn-primary mb-0">Retour</a>
{% endblock %}

{% block mainContent %}

{include('admin/formation/_form.html.twig')}

{% endblock %}

    </>
  );
}
