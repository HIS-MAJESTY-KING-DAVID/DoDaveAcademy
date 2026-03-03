import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %} | Classes{% endblock %}

{% block pageTitle %}Classes{% endblock %}

{% block cardTitle %}Détails{% endblock %}

{% block cardFooter %}
    <a className="btn btn-app" href="{path('app_classe_index')}">
        <i className="fas fa-arrow-left"></i> Liste
    </a>
    <a className="btn btn-app" href="{path('app_classe_edit', {'id': classe.id})}"><i className="fas fa-edit"></i> Editer</a>
    {include('classe/_delete_form.html.twig', {path: path('app_classe_delete', {'id': classe.id}), token: csrf_token('delete' ~ classe.id), classes: 'btn-danger'})}
{% endblock %}

{% block body %}
    <table className="table">
        <tbody>
            <tr>
                <th>Id</th>
                <td>{classe.id}</td>
            </tr>
            <tr>
                <th>Name</th>
                <td>{classe.name}</td>
            </tr>
            <tr>
                <th>Slug</th>
                <td>{classe.slug}</td>
            </tr>
        </tbody>
    </table>
{% endblock %}

    </>
  );
}
