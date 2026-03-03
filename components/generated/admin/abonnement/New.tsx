import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>

{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Create new Abonnement{% endblock %}

{% block actionBtn %}
    <a href="{path('app_admin_abonnement_index')}"  className="btn btn-sm btn-secondary mb-0">back to list</a>
	<a href="#" data-bs-toggle="modal" data-bs-target="#itemAbonnementModal" className="btn btn-sm btn-primary mb-0">Add new plan item</a>
{% endblock %}

    
{% block mainContent %}
    {include('admin/abonnement/_form.html.twig')}
{% endblock %}

    </>
  );
}
