import React from 'react';
import Link from 'next/link';

export default function BuyCourse(props: any) {
  return (
    <>
{% extends "front/base.html.twig" %}

{% block title %} - Buy Course{% endblock %}

{% block mainContent %}
    <section className="mb-9 position-relative" style="background-image:url({asset('assets/images/bg/07.jpg')}); background-position: center left; background-size: cover;">
        <!-- Background dark overlay -->
        <div className="bg-overlay bg-blue opacity-9"></div>
        <div className="container z-index-9 position-relative">
            <div className="row g-4 justify-content-between align-items-center">
                <!-- Content -->
                <div className="col-lg-6">
                    <h1 className="text-white">Payment</h1>
                    <hr />
                    <h2 className="text-white">{course.intitule}</h2>
                    <p className="text-white mb-3">{course.description}</p>
                    <a href="{url("app_front_course_details", {slug: course.slug}, "http", false)}" className="btn btn-white mb-0">More course details<i className="bi bi-arrow-right ms-2"></i></a>
                </div>

                <!-- Form -->
                <div className="col-lg-6 col-xl-5 mb-n9">
                    <div className="card card-body shadow p-4 p-sm-5">
                        <!-- Title -->
                        <h2 className="mb-0 h3">Payment form</h2>
                        <p className="mb-0">Please complete the form to initiate payment</p>
                        <!-- Form START -->
                        <form method="POST" className="mt-3 mt-sm-4 text-start">
                            {errorMessage is  defined and not errorMessage is  null && (

                                <div className="alert alert-danger">
                                    <h3>Erreur Survenue !</h3>
                                    <hr />
                                    <p>{errorMessage}</p>
                                </div>
                            
)}
                            
                            <div className="mb-3">
                                <label className="form-label">Course price</label>
                                <input name="price" type="text" disabled className="form-control" value="{course.montantAbonnement} XAF" />
                            </div>
                            <!-- Password -->
                            <div className="mb-3">
                                <label className="form-label">Select a payment method</label>
                                <select required name="payment_method" id="" className="form-control js-choice">
                                    <option value=""></option>
                                    {paymentMethods.map(pm => (

                                        <option value="{pm.code}">{pm.label}</option>
                                    
))}
                                </select>
                            </div>
                            <!-- Phone -->
                            <div className="mb-3">
                                <label className="form-label">Phone Number</label>
                                <input required name="phone" type="text" className="form-control" value="{student.utilisateur.personne.telephone}" />
                            </div>
                            <!-- Password -->
                            <!-- Remember me -->
                            <div className="mb-3 d-sm-flex justify-content-between">
                                <div>
                                    <input required type="checkbox" className="form-check-input" id="rememberCheck" />
                                    <label className="form-check-label" for="rememberCheck">I accept the terms</label>
                                </div>
                                <input type="hidden" name="_token" value="{csrf_token('payment' ~ course.id)}" />
                            </div>
                            <!-- Button -->
                            <div className="d-grid"><button type="submit" name="initiate_payment" value="true" className="btn btn-dark mb-0">Initiate Payment</button></div>
                        </form>
                        <!-- Form END -->
                    </div>
                </div>

            </div> <!-- Row END -->
        </div>
	</section>
{% endblock %}

    </>
  );
}
