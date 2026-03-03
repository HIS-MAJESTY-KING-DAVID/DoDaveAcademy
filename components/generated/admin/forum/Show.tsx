import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Forum{% endblock %}

{% block body %}
    <h1>Forum</h1>

    <table className="table">
        <tbody>
            <tr>
                <th>Id</th>
                <td>{forum.id}</td>
            </tr>
        </tbody>
    </table>

    <a href="{path('app_forum_index')}">back to list</a>

    <a href="{path('app_forum_edit', {'id': forum.id})}">edit</a>

    {include('forum/_delete_form.html.twig')}
{% endblock %}

    </>
  );
}
