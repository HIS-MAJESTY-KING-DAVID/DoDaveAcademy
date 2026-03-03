import React from 'react';
import Link from 'next/link';

export default function Edit(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Repondre Messages reçus{% endblock %}


    
{% block mainContent %}

    {include('contact/_form.html.twig', {'button_label': 'Send '})}

    <a href="{path('app_contact_index')}">back to list</a>

    {/* {include('contact/_delete_form.html.twig')} */}
{% endblock %}

    </>
  );
}
