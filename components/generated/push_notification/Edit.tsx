import React from 'react';
import Link from 'next/link';

export default function Edit(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Push Notification{% endblock %}

{% block actionBtn %}
    <a href="{path('app_push_notification_index')}"  className="btn btn-sm btn-secondary mb-0">back to list</a>
{% endblock %}

    
{% block mainContent %}


    {include('push_notification/_form.html.twig', {'button_label': 'Update'})}
    <br />
    <a href="{path('app_push_notification_index')}">back to list</a>
    <br />
    {include('push_notification/_delete_form.html.twig')}
{% endblock %}

    </>
  );
}
