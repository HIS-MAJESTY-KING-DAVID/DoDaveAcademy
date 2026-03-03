import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}PartAction{% endblock %}

{% block body %}
    <h1>PartAction</h1>

    <table className="table">
        <tbody>
            <tr>
                <th>Id</th>
                <td>{part_action.id}</td>
            </tr>
            <tr>
                <th>Nombre</th>
                <td>{part_action.nombre}</td>
            </tr>
            <tr>
                <th>Relation</th>
                <td>{part_action.relation}</td>
            </tr>
            <tr>
                <th>Type</th>
                <td>{part_action.type}</td>
            </tr>
        </tbody>
    </table>

    <a href="{path('app_part_action_index')}">back to list</a>

    <a href="{path('app_part_action_edit', {'id': part_action.id})}">edit</a>

    {include('part_action/_delete_form.html.twig')}
{% endblock %}

    </>
  );
}
