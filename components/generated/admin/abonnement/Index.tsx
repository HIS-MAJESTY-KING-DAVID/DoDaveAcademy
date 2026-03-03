import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Abonnements{% endblock %}

{% block actionBtn %}
	<a href="{url("app_admin_abonnement_new")}" className="btn btn-sm btn-primary mb-0">Add new plan</a>
{% endblock %}

{% block script %}
    
{% endblock %}

{% block mainContent %}


    <!-- Pricing START -->
    <div className="row g-4">

        {plans.map(plan => (

            
            <!-- Pricing item START -->
            <div className="col-md-6 col-xl-4">
                <div className="card border rounded-3 p-2 p-sm-4 h-100">
                    <!-- Card Header -->
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

                    <!-- Divider -->
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
                        <div>
                        <h4 >Invitation: <span style="color: orange;">{(plan.NbrePoint != null) ? plan.NbrePoint : '  / '} pt(s)</span></h4>
                    </div>
                    </div>
                    <!-- Card Footer -->
                    <div className="card-footer text-center d-grid pb-0">
                        <a href="{url("app_admin_abonnement_edit", {id: plan.id})}" type="button" className="btn btn-dark mb-0">Edit</a>
                        {include('admin/abonnement/_delete_form.html.twig', {abonnement: plan})}
                    </div>
                </div>
            </div>
            <!-- Pricing item END -->

        
))}
        
    </div>	<!-- Row END -->
    <!-- Pricing END -->

{% endblock %}
    </>
  );
}
