import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Catégories{% endblock %}

{% block mainContent %}

    <div className="row">
        <div className="col-md-6">
            {include('admin/categorie/_form.html.twig')}
        </div>
    </div>

{% endblock %}

    </>
  );
}
