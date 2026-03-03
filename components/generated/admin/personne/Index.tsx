import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Personne index{% endblock %}

{% block body %}
    <h1>Personne index</h1>

    <table className="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>LastName</th>
                <th>FirstName</th>
                <th>Pseudo</th>
                <th>BornAt</th>
                <th>LieuNaissance</th>
                <th>Sexe</th>
                <th>Avatar</th>
                <th>Adresse</th>
                <th>Telephone</th>
                <th>InvitationCode</th>
                <th>InvitationLink</th>
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
        {personnes.map(personne => (

            <tr>
                <td>{personne.id}</td>
                <td>{personne.lastName}</td>
                <td>{personne.firstName}</td>
                <td>{personne.pseudo}</td>
                <td>{personne.bornAt ? personne.bornAt|date('Y-m-d') : ''}</td>
                <td>{personne.lieuNaissance}</td>
                <td>{personne.sexe}</td>
                <td>{personne.avatar}</td>
                <td>{personne.adresse}</td>
                <td>{personne.telephone}</td>
                <td>{personne.invitationCode}</td>
                <td>{personne.invitationLink}</td>
                <td>
                    <a href="{path('app_personne_show', {'id': personne.id})}">show</a>
                    <a href="{path('app_personne_edit', {'id': personne.id})}">edit</a>
                </td>
            </tr>
        
) || (

            <tr>
                <td colspan="13">no records found</td>
            </tr>
        
))}
        </tbody>
    </table>

    <a href="{path('app_personne_new')}">Create new</a>
{% endblock %}

    </>
  );
}
