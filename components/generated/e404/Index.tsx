import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Not Found{% endblock %}

{% block body %}
<div className="container-fluid page-header py-5">
	<div className="container text-center py-5">
		<h1 className="display-2 text-white mb-4 animated slideInDown">404 Error</h1>
		<nav aria-label="breadcrumb animated slideInDown">
			<ol className="breadcrumb justify-content-center mb-0">
				<li className="breadcrumb-item">
					<a href="#">Home</a>
				</li>
				<li className="breadcrumb-item">
					<a href="#">Pages</a>
				</li>
				<li className="breadcrumb-item" aria-current="page">404 Error</li>
			</ol>
		</nav>
	</div>
</div>
<!-- Page Header End -->


<!-- Fact Start -->
<div className="container-fluid bg-secondary py-5">
	<div className="container">
		<div className="row">
			<div className="col-lg-3 wow fadeIn" data-wow-delay=".1s">
				<div className="d-flex counter">
					<h1 className="me-3 text-primary counter-value">99</h1>
					<h5 className="text-white mt-1">Success in getting happy customer</h5>
				</div>
			</div>
			<div className="col-lg-3 wow fadeIn" data-wow-delay=".3s">
				<div className="d-flex counter">
					<h1 className="me-3 text-primary counter-value">25</h1>
					<h5 className="text-white mt-1">Thousands of successful business</h5>
				</div>
			</div>
			<div className="col-lg-3 wow fadeIn" data-wow-delay=".5s">
				<div className="d-flex counter">
					<h1 className="me-3 text-primary counter-value">120</h1>
					<h5 className="text-white mt-1">Total clients who love HighTech</h5>
				</div>
			</div>
			<div className="col-lg-3 wow fadeIn" data-wow-delay=".7s">
				<div className="d-flex counter">
					<h1 className="me-3 text-primary counter-value">5</h1>
					<h5 className="text-white mt-1">Stars reviews given by satisfied clients</h5>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Fact End -->


<!-- 404 Start -->
<div className="container-fluid py-5 my-5 wow fadeIn" data-wow-delay="0.3s">
	<div className="container text-center py-5">
		<div className="row justify-content-center">
			<div className="col-lg-6">
				<i className="bi bi-exclamation-triangle display-1 text-primary"></i>
				<h1 className="display-1">404</h1>
				<h1 className="mb-4">Page Not Found</h1>
				<p className="mb-4">We’re sorry, the page you have looked for does not exist in our website! Maybe go to our home page or try to use a search?</p>
				<a className="btn btn-primary rounded-pill py-3 px-5" href="">Go Back To Home</a>
			</div>
		</div>
	</div>
</div>

{% endblock %}

    </>
  );
}
