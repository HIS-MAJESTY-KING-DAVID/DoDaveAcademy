import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %} | Pays{% endblock %}

{% block pageTitle %}Pays{% endblock %}

{% block cardTitle %}Détails{% endblock %}

{% block cardFooter %}
    <a className="btn btn-app" href="{path('app_pays_index')}">
        <i className="fas fa-arrow-left"></i> Liste
    </a>
    <a className="btn btn-app" href="{path('app_pays_edit', {'id': pay.id})}">
        <i className="fas fa-edit"></i> Editer
    </a>

    {include('includes/_delete_form.html.twig', {path: path('app_pays_delete', {'id': pay.id}), token: csrf_token('delete' ~ pay.id), classes: 'btn-danger'})}
{% endblock %}

{% block body %}

    <table className="table">
        <tbody>
            <tr>
                <th>Id</th>
                <td>{pay.id}</td>
            </tr>
            <tr>
                <th>Name</th>
                <td>{pay.name}</td>
            </tr>
            <tr>
                <th>Slug</th>
                <td>{pay.slug}</td>
            </tr>
            <tr>
                <th>Code</th>
                <td>{pay.code}</td>
            </tr>
        </tbody>
    </table>

{% endblock %}

    </>
  );
}
