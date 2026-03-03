import React from 'react';
import Link from 'next/link';

export default function Edit(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Edit Sujet{% endblock %}

{% block body %}
    <h1>Edit Sujet</h1>

    {include('sujet/_form.html.twig', {'button_label': 'Update'})}

    <a href="{path('app_sujet_index')}">back to list</a>

    {include('sujet/_delete_form.html.twig')}
{% endblock %}

    </>
  );
}
