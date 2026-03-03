import React from 'react';
import Link from 'next/link';

export default function Edit(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Edit PartAction{% endblock %}

{% block body %}
    <h1>Edit PartAction</h1>

    {include('part_action/_form.html.twig', {'button_label': 'Update'})}

    <a href="{path('app_part_action_index')}">back to list</a>

    {include('part_action/_delete_form.html.twig')}
{% endblock %}

    </>
  );
}
