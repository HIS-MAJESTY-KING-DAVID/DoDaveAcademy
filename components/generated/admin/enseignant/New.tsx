import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}New Enseignant{% endblock %}

{% block body %}
    <h1>Create new Enseignant</h1>

    {include('enseignant/_form.html.twig')}

    <a href="{path('app_enseignant_index')}">back to list</a>
{% endblock %}

    </>
  );
}
