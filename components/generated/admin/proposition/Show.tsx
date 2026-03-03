import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Proposition{% endblock %}

{% block body %}
    <h1>Proposition</h1>

    <table className="table">
        <tbody>
            <tr>
                <th>Id</th>
                <td>{proposition.id}</td>
            </tr>
            <tr>
                <th>Content</th>
                <td>{proposition.content}</td>
            </tr>
            <tr>
                <th>IsTrue</th>
                <td>{proposition.isTrue ? 'Yes' : 'No'}</td>
            </tr>
        </tbody>
    </table>

    <a href="{path('app_proposition_index')}">back to list</a>

    <a href="{path('app_proposition_edit', {'id': proposition.id})}">edit</a>

    {include('proposition/_delete_form.html.twig')}
{% endblock %}

    </>
  );
}
