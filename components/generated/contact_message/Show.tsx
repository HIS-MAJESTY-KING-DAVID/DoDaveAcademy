import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}ContactMessage{% endblock %}

{% block body %}
    <h1>ContactMessage</h1>

    <table className="table">
        <tbody>
            <tr>
                <th>Id</th>
                <td>{contact_message.id}</td>
            </tr>
            <tr>
                <th>Name</th>
                <td>{contact_message.name}</td>
            </tr>
            <tr>
                <th>Project</th>
                <td>{contact_message.project}</td>
            </tr>
            <tr>
                <th>Message</th>
                <td>{contact_message.message}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>{contact_message.email}</td>
            </tr>
        </tbody>
    </table>

    <a href="{path('app_contact_message_index')}">back to list</a>

    <a href="{path('app_contact_message_edit', {'id': contact_message.id})}">edit</a>

    {include('contact_message/_delete_form.html.twig')}
{% endblock %}

    </>
  );
}
