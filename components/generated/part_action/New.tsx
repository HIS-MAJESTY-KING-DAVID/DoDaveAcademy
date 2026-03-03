import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}New PartAction{% endblock %}

{% block body %}
    <h1>Create new PartAction</h1>

    {include('part_action/_form.html.twig')}

    <a href="{path('app_part_action_index')}">back to list</a>
{% endblock %}

    </>
  );
}
