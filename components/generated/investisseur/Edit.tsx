import React from 'react';
import Link from 'next/link';

export default function Edit(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Edit Investisseur{% endblock %}

{% block body %}
    <h1>Edit Investisseur</h1>

    {include('investisseur/_form.html.twig', {'button_label': 'Update'})}

    <a href="{path('app_investisseur_index')}">back to list</a>

    {include('investisseur/_delete_form.html.twig')}
{% endblock %}

    </>
  );
}
