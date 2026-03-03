import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %} Type d'Enseignement{% endblock %}

{% block pageTitle %}Type d'enseignement{% endblock %}

{% block cardTitle %}Détails{% endblock %}

{% block cardFooter %}

    <a className="btn btn-app" href="{path('app_type_enseignement_index')}">
        <i className="fas fa-arrow-left"></i> Liste
    </a>
    <a className="btn btn-app" href="{path('app_type_enseignement_edit', {'id': type_enseignement.id})}">
        <i className="fa fa-edit"></i> Modifier
    </a>

    {include('type_enseignement/_delete_form.html.twig')}

{% endblock %}

{% block body %}

    <table className="table">
        <tbody>
            <tr>
                <th>Id</th>
                <td>{type_enseignement.id}</td>
            </tr>
            <tr>
                <th>Name</th>
                <td>{type_enseignement.name}</td>
            </tr>
            <tr>
                <th>Slug</th>
                <td>{type_enseignement.slug}</td>
            </tr>
        </tbody>
    </table>

{% endblock %}

    </>
  );
}
