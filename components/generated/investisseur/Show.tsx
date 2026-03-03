import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Investisseur
{% endblock %}

{% block body %}
	<h1>Investisseur</h1>

	<table className="table">
		<tbody>
			<tr>
				<th>Id</th>
				<td>{investisseur.id}</td>
			</tr>
			<tr>
				<th>Nom</th>
				<td>{investisseur.nom}</td>
			</tr>
			<tr>
				<th>Ville</th>
				<td>{investisseur.ville}</td>
			</tr>
			<tr>
				<th>Phone</th>
				<td>{investisseur.phone}</td>
			</tr>
			<tr>
				<th>Email</th>
				<td>{investisseur.email}</td>
			</tr>
			<tr>
				<th>CreateAt</th>
				<td>{investisseur.createAt ? investisseur.createAt|date('Y-m-d H:i:s') : ''}</td>
			</tr>

		</tbody>
	</table>

	<a href="{path('app_investisseur_index')}">back to list</a>

	<a href="{path('app_investisseur_edit', {'id': investisseur.id})}">edit</a>

	{include('investisseur/_delete_form.html.twig')}
{% endblock %}

    </>
  );
}
