import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Proposition index{% endblock %}

{% block body %}
    <h1>Proposition index</h1>

    <table className="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Content</th>
                <th>IsTrue</th>
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
        {propositions.map(proposition => (

            <tr>
                <td>{proposition.id}</td>
                <td>{proposition.content}</td>
                <td>{proposition.isTrue ? 'Yes' : 'No'}</td>
                <td>
                    <a href="{path('app_proposition_show', {'id': proposition.id})}">show</a>
                    <a href="{path('app_proposition_edit', {'id': proposition.id})}">edit</a>
                </td>
            </tr>
        
) || (

            <tr>
                <td colspan="4">no records found</td>
            </tr>
        
))}
        </tbody>
    </table>

    <a href="{path('app_proposition_new')}">Create new</a>
{% endblock %}

    </>
  );
}
