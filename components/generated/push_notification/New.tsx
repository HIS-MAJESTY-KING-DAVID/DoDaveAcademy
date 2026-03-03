import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Create new Push Notification{% endblock %}

{% block actionBtn %}
    <a href="{path('app_push_notification_index')}"  className="btn btn-sm btn-secondary mb-0">back to list</a>
{% endblock %}

    
{% block mainContent %}

    {include('push_notification/_form.html.twig')}

{% endblock %}

    </>
  );
}
