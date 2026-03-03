import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Chapitre index{% endblock %}

{% block body %}
    <h1>Chapitre index</h1>

    <table className="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Objectifs</th>
                <th>Description</th>
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
        {chapitres.map(chapitre => (

            <tr>
                <td>{chapitre.id}</td>
                <td>{chapitre.title}</td>
                <td>{chapitre.slug}</td>
                <td>{chapitre.objectifs}</td>
                <td>{chapitre.description}</td>
                <td>
                    <a href="{path('app_chapitre_show', {'id': chapitre.id})}">show</a>
                    <a href="{path('app_chapitre_edit', {'id': chapitre.id})}">edit</a>
                </td>
            </tr>
        
) || (

            <tr>
                <td colspan="6">no records found</td>
            </tr>
        
))}
        </tbody>
    </table>

    <a href="{path('app_chapitre_new')}">Create new</a>
{% endblock %}

    </>
  );
}
