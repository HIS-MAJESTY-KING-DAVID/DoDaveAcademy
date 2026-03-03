import React from 'react';
import Link from 'next/link';

export default function Edit(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Network Config{% endblock %}

{% block actionBtn %}
    <a href="{path('app_admin_network_config_index')}" className="">back to list</a>
    {include('admin/network_config/_delete_form.html.twig')}
{% endblock %}

{% block script %}
    
{% endblock %}

{% block mainContent %}
    <div className="card bg-transparent border">
        <!-- Card body START -->
        <div className="card-body">
            {include('admin/network_config/_form.html.twig', {'button_label': 'Enregistrer les modifications'})}
        </div>
    </div>
{% endblock %}

    </>
  );
}
