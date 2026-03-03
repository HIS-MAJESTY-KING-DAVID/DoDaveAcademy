import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %} | Etablissements{% endblock %}

{% block pageTitle %}Enseignants{% endblock %}

{% block cardTitle %}Détails{% endblock %}

{% block cardFooter %}
    <a className="btn btn-app" href="{path('app_etablissement_index')}">
        <i className="fas fa-plus"></i> Nouveau
    </a>
    <a className="btn btn-app" href="{path('app_etablissement_edit', {'id': etablissement.id})}">
        <i className="fas fa-edit"></i> Mofifier
    </a>
    {include('includes/_delete_form.html.twig', {path: path('app_etablissement_delete', {'id': etablissement.id}), token: csrf_token('delete' ~ etablissement.id), classes: 'btn-danger'})}

{% endblock %}

{% block body %}

    <table className="table">
        <tbody>
            <tr>
                <th>Id</th>
                <td>{etablissement.id}</td>
            </tr>
            <tr>
                <th>Nom</th>
                <td>{etablissement.name}</td>
            </tr>
            <tr>
                <th>Ville</th>
                <td>{etablissement.ville}</td>
            </tr>
            <tr>
                <th>Pays</th>
                <td>{etablissement.pays.name}</td>
            </tr>
        </tbody>
    </table>
    
{% endblock %}

    </>
  );
}
