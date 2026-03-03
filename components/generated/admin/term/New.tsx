import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Terms and | New{% endblock %}

{% block actionBtn %}

{% endblock %}

{% block script %}

{% endblock %}

{% block mainContent %}
<div className="card bg-transparent border">
    <!-- Card body START -->
    <div className="card-body">
        {include('admin/term/_form.html.twig')}
    </div>
{% endblock %}

    </>
  );
}
