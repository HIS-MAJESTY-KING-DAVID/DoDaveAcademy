import React from 'react';
import Link from 'next/link';

export default function Edit(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Edit ContactMessage{% endblock %}

{% block body %}
    <h1>Edit ContactMessage</h1>

    {include('contact_message/_form.html.twig', {'button_label': 'Update'})}

    <a href="{path('app_contact_message_index')}">back to list</a>

    {include('contact_message/_delete_form.html.twig')}
{% endblock %}

    </>
  );
}
