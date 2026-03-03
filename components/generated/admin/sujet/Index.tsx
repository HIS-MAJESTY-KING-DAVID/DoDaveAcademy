import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Sujet index{% endblock %}

{% block body %}
    <h1>Sujet index</h1>

    <table className="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Content</th>
                <th>IsSolved</th>
                <th>CreatedAt</th>
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
        {sujets.map(sujet => (

            <tr>
                <td>{sujet.id}</td>
                <td>{sujet.content}</td>
                <td>{sujet.isSolved ? 'Yes' : 'No'}</td>
                <td>{sujet.createdAt ? sujet.createdAt|date('Y-m-d H:i:s') : ''}</td>
                <td>
                    <a href="{path('app_sujet_show', {'id': sujet.id})}">show</a>
                    <a href="{path('app_sujet_edit', {'id': sujet.id})}">edit</a>
                </td>
            </tr>
        
) || (

            <tr>
                <td colspan="5">no records found</td>
            </tr>
        
))}
        </tbody>
    </table>

    <a href="{path('app_sujet_new')}">Create new</a>
{% endblock %}

    </>
  );
}
