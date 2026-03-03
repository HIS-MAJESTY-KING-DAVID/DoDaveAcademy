import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}{sous_systeme.name}{% endblock %}

{% block pageTitle %}Sous-systèmes scolaire{% endblock %}

{% block cardTitle %}Détails{% endblock %}

{% block cardFooter %}
    <a className="btn btn-app" href="{path('app_sous_systeme_index')}">
        <i className="fas fa-arrow-left"></i> Liste
    </a>
    <a className="btn btn-app" href="{path('app_sous_systeme_edit', {'id': sous_systeme.id})}">
        <i className="fas fa-edit"></i> Modifier
    </a>
    {include('sous_systeme/_delete_form.html.twig')}
{% endblock %}

{% block body %}

    <table className="table">
        <tbody>
            <tr>
                <th>Id</th>
                <td>{sous_systeme.id}</td>
            </tr>
            <tr>
                <th>Name</th>
                <td>{sous_systeme.name}</td>
            </tr>
            <tr>
                <th>Slug</th>
                <td>{sous_systeme.slug}</td>
            </tr>
        </tbody>
    </table>
{% endblock %}

    </>
  );
}
