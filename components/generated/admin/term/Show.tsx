import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Terms and | Show{% endblock %}

{% block actionBtn %}
    {include('admin/term/_delete_form.html.twig')}
{% endblock %}

{% block script %}

{% endblock %}

{% block mainContent %}
    <div className="card bg-transparent border">
        <div className="card-header bg-light border-bottom">
            <h3 className="card-header-pills">{{{ term.title} }}</h3>
            <b className="badge badge-{term.isOnline ? 'success' : 'danger'}">{term.isOnline ? 'Online' : 'Not Online'}</b>
        </div>
        <!-- Card body START -->
        <div className="card-body">
            <div>{term.content|raw}</div>
        </div>
    </div>
{% endblock %}

    </>
  );
}
