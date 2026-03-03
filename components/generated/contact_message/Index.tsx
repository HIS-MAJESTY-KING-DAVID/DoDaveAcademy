import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}ContactMessage index{% endblock %}

{% block body %}
    <h1>ContactMessage index</h1>

    <table className="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Project</th>
                <th>Message</th>
                <th>Email</th>
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
        {contact_messages.map(contact_message => (

            <tr>
                <td>{contact_message.id}</td>
                <td>{contact_message.name}</td>
                <td>{contact_message.project}</td>
                <td>{contact_message.message}</td>
                <td>{contact_message.email}</td>
                <td>
                    <a href="{path('app_contact_message_show', {'id': contact_message.id})}">show</a>
                    <a href="{path('app_contact_message_edit', {'id': contact_message.id})}">edit</a>
                </td>
            </tr>
        
) || (

            <tr>
                <td colspan="6">no records found</td>
            </tr>
        
))}
        </tbody>
    </table>

    <a href="{path('app_contact_message_new')}">Create new</a>
{% endblock %}

    </>
  );
}
