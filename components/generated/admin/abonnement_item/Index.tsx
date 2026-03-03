import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
<!DOCTYPE html>

<title>AbonnementItem index</title>

{% block body %}
    <h1>AbonnementItem index</h1>

    <table className="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Label</th>
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
        {abonnement_items.map(abonnement_item => (

            <tr>
                <td>{abonnement_item.id}</td>
                <td>{abonnement_item.label}</td>
                <td>
                    <a href="{path('app_admin_abonnement_item_show', {'id': abonnement_item.id})}">show</a>
                    <a href="{path('app_admin_abonnement_item_edit', {'id': abonnement_item.id})}">edit</a>
                </td>
            </tr>
        
) || (

            <tr>
                <td colspan="3">no records found</td>
            </tr>
        
))}
        </tbody>
    </table>

    <a href="{path('app_admin_abonnement_item_new')}">Create new</a>
{% endblock %}

    </>
  );
}
