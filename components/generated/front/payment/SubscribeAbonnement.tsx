import React from 'react';
import Link from 'next/link';

export default function SubscribeAbonnement(props: any) {
  return (
    <>
{% extends "front/base.html.twig" %}

{% block title %} - Subscribe Plan{% endblock %}

{% block mainContent %}
    <section className="mb-9 position-relative" style="background-image:url({asset('assets/images/bg/07.jpg')}); background-position: center left; background-size: cover;">
        <!-- Background dark overlay -->
        <div className="bg-overlay bg-blue opacity-9"></div>
        <div className="container z-index-9 position-relative">
            <div className="row g-4 justify-content-between align-items-center">
                <!-- Form -->
                <div className="col-lg-6 col-xl-6 mb-n9">
                    <div className="card card-body shadow p-4 p-sm-5">
                        <!-- Title -->
                        <h2 className="mb-0 h3">Payment form</h2>
                        <p className="mb-0">Please complete the form to initiate payment</p>
                        <div className="card-header p-0">
                        <!-- Price and Info -->
                        <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-2">
                            <!-- Info -->
                            <div>
                                <h5 className="mb-0">{plan.label}</h5>
                                {plan.isRecommended && (

                                    <div className="badge bg-grad mb-0 rounded-pill">Recommended</div>
                                
)}
                            </div>
                            <!-- Price -->
                            <div>
                                <h4 className="text-success mb-0 plan-price" data-monthly-price="{plan.montant} XAF" data-annual-price="{plan.montant} XAF">{plan.montant} XAF</h4>
                            </div>
                        </div>
                    </div>
                        <!-- Form START -->
                        <form method="POST" className="mt-3 mt-sm-4 text-start">
                            {errorMessage is defined and not errorMessage is null && (

                                <div className="alert alert-danger">
                                    <h3>Erreur Survenue !</h3>
                                    <hr />
                                    <p>{errorMessage}</p>
                                </div>
                            
)}
                            <!-- Email -->
                            <div className="mb-3">
                                <label className="form-label">Plan amount</label>
                                <input name="price" type="text" disabled className="form-control" value="{plan.montant} XAF" />
                            </div>
                            <!-- Password -->
                            <div className="mb-3">
                                <label className="form-label">Select a payment method</label>
                                <select required name="payment_method" id="" className="form-control js-choice">
                                    <option value="">Select payment method</option>
                                    {% for pm in plan.paymentMethods %}
                                        <option value="{pm.code}">{pm.label}</option>
                                    
))}
                                </select>
                            </div>
                            <!-- Phone -->
                            <div className="mb-3">
                                <label className="form-label">Paiement Number</label>
                                <input required name="phone" type="text" className="form-control" value="{student.utilisateur.personne.telephone}" />
                            </div>
                            <!-- Password -->
                            <!-- Remember me -->
                            <div className="mb-3 d-sm-flex justify-content-between">
                                <div>
                                    <input required type="checkbox" className="form-check-input" id="rememberCheck" />
                                    <label className="form-check-label" for="rememberCheck">I accept the <a href="">terms</a></label>
                                </div>
                                <input type="hidden" name="_token" value="{csrf_token('payment' ~ plan.id)}" />
                            </div>
                            <!-- Button -->
                            <div className="d-grid"><button type="submit" name="initiate_payment" value="true" className="btn btn-dark mb-0">Initiate Payment</button></div>
                        </form>
                        <!-- Form END -->
                    </div>
                    <div className="position-relative my-3 text-center">
                    <hr />
                    <p className="small position-absolute top-50 start-50 translate-middle bg-body px-3">All plans included</p>
                </div>

                <!-- Card Body -->
                <div className="card-body pt-0">
                    <ul className="list-unstyled mt-2 mb-0">
                        {abonnementItems.map(item => (

                            {item in plan.items && (

                                <li className="mb-3 h6 fw-light"><i className="bi bi-patch-check-fill text-success me-2"></i>{item.label}</li>
                            
) || (

                                <li className="mb-3 h6 fw-light"><i className="bi bi-x-octagon-fill text-danger me-2"></i>{item.label}</li>
                            
)}
                        
))}
                    </ul>
                </div>
                </div>

                <!-- Content -->
               

            </div> <!-- Row END -->
        </div>
	</section>
{% endblock %}

    </>
  );
}
