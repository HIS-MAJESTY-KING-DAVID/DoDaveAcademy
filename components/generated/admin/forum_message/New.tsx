import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}New ForumMessage{% endblock %}

{% block body %}
    <h1>Create new ForumMessage</h1>

    {include('forum_message/_form.html.twig')}

    <a href="{path('app_forum_message_index')}">back to list</a>
{% endblock %}

    </>
  );
}
