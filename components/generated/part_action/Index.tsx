import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}PartAction index{% endblock %}

{% block body %}
    <h1>PartAction index</h1>

    <table className="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Relation</th>
                <th>Type</th>
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
        {part_actions.map(part_action => (

            <tr>
                <td>{part_action.id}</td>
                <td>{part_action.nombre}</td>
                <td>{part_action.relation}</td>
                <td>{part_action.type}</td>
                <td>
                    <a href="{path('app_part_action_show', {'id': part_action.id})}">show</a>
                    <a href="{path('app_part_action_edit', {'id': part_action.id})}">edit</a>
                </td>
            </tr>
        
) || (

            <tr>
                <td colspan="5">no records found</td>
            </tr>
        
))}
        </tbody>
    </table>

    <a href="{path('app_part_action_new')}">Create new</a>
{% endblock %}

    </>
  );
}
