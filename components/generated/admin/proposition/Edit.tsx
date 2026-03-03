import React from 'react';
import Link from 'next/link';

export default function Edit(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Edit Proposition{% endblock %}

{% block body %}
    <h1>Edit Proposition</h1>

    {include('proposition/_form.html.twig', {'button_label': 'Update'})}

    <a href="{path('app_proposition_index')}">back to list</a>

    {include('proposition/_delete_form.html.twig')}
{% endblock %}

    </>
  );
}
