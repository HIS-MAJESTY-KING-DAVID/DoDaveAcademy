import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Hello Contact
{% endblock %}

{% block body %}
	<!-- Page Header Start -->
	<div className="container-fluid page-header py-5">
		<div className="container text-center py-5">
			<h1 className="display-2 text-white mb-4 animated slideInDown">Contact Us</h1>
			<nav aria-label="breadcrumb animated slideInDown">
				<ol className="breadcrumb justify-content-center mb-0">
					<li className="breadcrumb-item">
						<a href="#">Home</a>
					</li>
					<li className="breadcrumb-item">
						<a href="#">Pages</a>
					</li>
					<li className="breadcrumb-item" aria-current="page">Contact</li>
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


	<!-- Contact Start -->
	<div className="container-fluid py-5 mt-5">
		<div className="container py-5">
			<div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
				<h5 className="text-primary">Get In Touch</h5>
				<h1 className="mb-3">Veuillez nous contacter pour tous vos soucis !</h1>
				<p className="mb-2">Nous sommes là pour vous aider ! N'hésitez pas à nous contacter pour toute question ou assistance. Nous sommes impatients de vous fournir le soutien dont vous avez besoin..
					<a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
			</div>
			<div className="contact-detail position-relative p-5">
				<div className="row g-5 mb-5 justify-content-center">
					<div className="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".3s">
						<div className="d-flex bg-light p-3 rounded">
							<div className="flex-shrink-0 btn-square bg-secondary rounded-circle" style="width: 64px; height: 64px;">
								<i className="fas fa-map-marker-alt text-white"></i>
							</div>
							<div className="ms-3">
								<h4 className="text-primary">Address</h4>
								<a href="https://goo.gl/maps/Zd4BCynmTb98ivUJ6" target="_blank" className="h5">
									DOUALA-Akwa/ Carrefour Équinox Tv face Beneficial Assurance</a>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".5s">
						<div className="d-flex bg-light p-3 rounded">
							<div className="flex-shrink-0 btn-square bg-secondary rounded-circle" style="width: 64px; height: 64px;">
								<i className="fa fa-phone text-white"></i>
							</div>
							<div className="ms-3">
								<h4 className="text-primary">Call Us</h4>
								<a className="h5" href="tel:+0123456789" target="_blank">+237675391197 / +237698809093</a>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".7s">
						<div className="d-flex bg-light p-3 rounded">
							<div className="flex-shrink-0 btn-square bg-secondary rounded-circle" style="width: 64px; height: 64px;">
								<i className="fa fa-envelope text-white"></i>
							</div>
							<div className="ms-3">
								<h4 className="text-primary">Email Us</h4>
								<a className="h5" href="mailto:contact@kulmapeck.com" target="_blank">contact@kulmapeck.com</a>
							</div>
						</div>
					</div>
				</div>
				<div className="row g-5">
					<div className="col-lg-6 wow fadeIn" data-wow-delay=".3s">
						<div className="p-5 h-100 rounded contact-map">
							<iframe className="rounded w-100 h-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.4710403339755!2d-73.82241512404069!3d40.685622471397615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c26749046ee14f%3A0xea672968476d962c!2s123rd%20St%2C%20Queens%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1686493221834!5m2!1sen!2sbd" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
						</div>
					</div>
					<div className="col-lg-6 wow fadeIn" data-wow-delay=".5s">
						<div className="p-5 rounded contact-form">
							{form_start(form)}
							{form_widget(form)}
							<br />
							<button className="btn bg-primary text-white py-3 px-5">{button_label|default('Send ')}</button>

							{form_end(form)}
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>

{% endblock %}

    </>
  );
}
