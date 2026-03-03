import React from 'react';
import Link from 'next/link';

export default function Register(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Users{% endblock %}

{% block actionBtn %}
	
{% endblock %}

{% block script %}
    
{% endblock %}

{% block mainContent %}

    <!-- Card START -->
	<div className="card bg-transparent border">

		<!-- Card header START -->
		<div className="card-header bg-light border-bottom">
			<!-- Search and select START -->
			<div className="row g-3 align-items-center justify-content-between">
				<!-- Search bar -->
				<div className="col-md-8">
					<form className="rounded position-relative" method="get">
						<input value="{search|default('')}" className="form-control bg-body" type="search" name="search" placeholder="Search" aria-label="Search" />
						<button className="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset" type="submit">
							<i className="fas fa-search fs-6 "></i>
						</button>
					</form>
				</div>
			</div>
			<!-- Search and select END -->
		</div>
		<!-- Card header END -->

		<!-- Card body START -->
		<div className="card-body">
			<!-- Form START -->
            <div className="p-4">
                {include('admin/registration/_form.html.twig')}
            </div>
		</div>
		<!-- Card body END -->

		<!-- Card footer START -->
		<div className="card-footer bg-transparent pt-0">
			<!-- Pagination START -->
			<div className="d-sm-flex justify-content-sm-between align-items-sm-center">

			</div>
			<!-- Pagination END -->
		</div>
		<!-- Card footer END -->
	</div>
    <!-- Card END -->
 

{% endblock %}
    </>
  );
}
