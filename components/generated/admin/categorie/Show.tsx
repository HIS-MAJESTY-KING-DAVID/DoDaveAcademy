import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %} | Catégories{% endblock %}

{% block pageTitle %}Catégories{% endblock %}

{% block cardTitle %}Editer{% endblock %}

{% block cardFooter %}
    <a className="btn btn-app" href="{path('app_categorie_index')}">
        <i className="fas fa-plus"></i> Liste
    </a>
    <a className="btn btn-app" href="{path('app_categorie_edit', {'id': categorie.id})}"><i className="fas fa-edit"></i> Editer</a>
    {include('includes/_delete_form.html.twig', {path: path('app_categorie_delete', {'id': categorie.id}), token: csrf_token('delete' ~ categorie.id), classes: 'btn-danger'})}
{% endblock %}

{% block body %}

    <table className="table">
        <tbody>
            <tr>
                <th>Id</th>
                <td>{categorie.id}</td>
            </tr>
            <tr>
                <th>Name</th>
                <td>{categorie.name}</td>
            </tr>
            <tr>
                <th>Slug</th>
                <td>{categorie.slug}</td>
            </tr>
            <tr>
                <th colspan="2" className="bg-black">Liste des cours pour cette discipline</th>
            </tr>
            {% for cours in categorie.cours %}
                <tr>
                    <td><a href="">{cours.intitule}</a></td>
                </tr>
            
) || (

                <td colspan="2">Aucun cours trouvé</td>       
            
))}
        </tbody>
    </table>

{% endblock %}

    </>
  );
}
