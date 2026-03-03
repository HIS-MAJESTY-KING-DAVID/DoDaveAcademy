import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %} | Spécialités{% endblock %}

{% block pageTitle %}Spécialités{% endblock %}

{% block cardTitle %}Editer{% endblock %}

{% block cardFooter %}
    <a className="btn btn-app" href="{path('app_specialite_index')}">
        <i className="fas fa-arrow-left"></i> Liste
    </a>
    <a href="{path('app_specialite_edit', {'id': specialite.id})}">
        <i className="fas fa-edit"></i> Editer
    </a>

    {include('specialite/_delete_form.html.twig', {path: path('app_specialite_delete', {'id': specialite.id}), token: csrf_token('delete' ~ specialite.id), classes: 'btn-danger'})}
{% endblock %}

{% block body %}

    <table className="table">
        <tbody>
            <tr>
                <th>Id</th>
                <td>{specialite.id}</td>
            </tr>
            <tr>
                <th>Name</th>
                <td>{specialite.name}</td>
            </tr>
            <tr>
                <th>Slug</th>
                <td>{specialite.slug}</td>
            </tr>
        </tbody>
    </table>

{% endblock %}

    </>
  );
}
