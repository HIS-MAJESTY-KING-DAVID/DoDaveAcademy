import React from 'react';
import Link from 'next/link';

export default function Edit(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Edit Enseignant{% endblock %}

{% block body %}
    <h1>Edit Enseignant</h1>

    {include('enseignant/_form.html.twig', {'button_label': 'Update'})}

    <a href="{path('app_enseignant_index')}">back to list</a>

    {include('enseignant/_delete_form.html.twig')}
{% endblock %}

    </>
  );
}
