import React from 'react';
import Link from 'next/link';

export default function Edit(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Terms and | Edit{% endblock %}

{% block actionBtn %}
    {include('admin/term/_delete_form.html.twig')}
{% endblock %}

{% block script %}

{% endblock %}

{% block mainContent %}
    <div className="card bg-transparent border">
        <!-- Card body START -->
        <div className="card-body">
            {include('admin/term/_form.html.twig', {'button_label': 'Update'})}
        </div>
    </div>
{% endblock %}


    </>
  );
}
