import React from 'react';
import Link from 'next/link';

export default function Admin(props: any) {
  return (
    <>

{% extends "admin/base.html.twig" %}

{% block mainContent %}
    {include('profile/_profile_content.html.twig')}
{% endblock %}
    </>
  );
}
