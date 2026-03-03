import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Investisseur index
{% endblock %}

{% block body %}
	<h1>Investisseur index</h1>

	<table className="table">
		<thead>
			<tr>
				<th>Id</th>
				<th>Nom</th>
				<th>Ville</th>
				<th>Phone</th>
				<th>Email</th>
				<th>CreateAt</th>
				<th>actions</th>
			</tr>
		</thead>
		<tbody>
			{investisseurs.map(investisseur => (

				<tr>
					<td>{investisseur.id}</td>
					<td>{investisseur.firstName ~ ' ' ~ investisseur.lastName}</td>
					<td>{investisseur.ville}</td>
					<td>{investisseur.phone}</td>
					<td>{investisseur.email}</td>
					<td>{investisseur.createAt ? investisseur.createAt|date('Y-m-d H:i:s') : ''}</td>
					<td>
						<a href="{path('app_investisseur_show', {'id': investisseur.id})}">show</a>
						<a href="{path('app_investisseur_edit', {'id': investisseur.id})}">edit</a>
					</td>
				</tr>
			
) || (

				<tr>
					<td colspan="8">no records found</td>
				</tr>
			
))}
		</tbody>
	</table>

	<a href="{path('app_investisseur_new')}">Create new</a>
{% endblock %}

    </>
  );
}
