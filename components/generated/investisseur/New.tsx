import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}New Investisseur
{% endblock %}

{% block body %}
	<div className="container-fluid page-header py-5">
		<div className="container text-center py-5">
			<h1 className="display-2 text-white mb-4 animated slideInDown">Devenir un Investisseur DoDave Academy</h1>
			<nav aria-label="breadcrumb animated slideInDown">
				<ol className="breadcrumb justify-content-center mb-0">
					<li className="breadcrumb-item">
						<a href="#">Home</a>
					</li>
					<li className="breadcrumb-item">
						<a href="#">Pages</a>
					</li>
					<li className="breadcrumb-item" aria-current="page">Investir</li>
				</ol>
			</nav>
		</div>
	</div>


	{include('investisseur/_form.html.twig')}
	<br />
{% endblock %}

    </>
  );
}
