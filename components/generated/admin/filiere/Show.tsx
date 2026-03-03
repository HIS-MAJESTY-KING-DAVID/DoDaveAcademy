import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %} | Filières {% endblock %}

{% block pageTitle %}Filières{% endblock %}

{% block cardTitle %}Détails{% endblock %}

{% block cardFooter %}
    <a className="btn btn-app" href="{path('app_filiere_index')}" >
        <i className="fas fa-arrow-left"></i> Liste
    </a>
    <a className="btn btn-app" href="{path('app_filiere_edit', {'id': filiere.id})}">
        <i className="fas fa-edit"></i> Editer
    </a>

    {include('includes/_delete_form.html.twig', {path: path('app_filiere_delete', {'id': filiere.id}), token: csrf_token('delete' ~ filiere.id), classes: 'btn-danger'})}
{% endblock %}

{% block body %}

    <table className="table">
        <tbody>
            <tr>
                <th>Id</th>
                <td>{filiere.id}</td>
            </tr>
            <tr>
                <th>Name</th>
                <td>{filiere.name}</td>
            </tr>
            <tr>
                <th>Slug</th>
                <td>{filiere.slug}</td>
            </tr>
        </tbody>
    </table>
    
{% endblock %}

    </>
  );
}
