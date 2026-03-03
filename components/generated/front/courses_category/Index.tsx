import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends "front/base.html.twig" %}

{% block title %} - Courses Categpries{% endblock %}

{% block mainContent %}
    
    
	<!-- =======================
	Page Banner START -->
	<section className="bg-light position-relative">

		<!-- Svg decoration -->
		<figure className="position-absolute bottom-0 start-0 d-none d-lg-block">
			<svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9">
				<path className="fill-warning opacity-5" d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z"></path>
			</svg>
		</figure>

		<div className="container position-relative">
			<div className="row">
				<div className="col-12">
					<div className="row align-items-center">

						<!-- Image -->
						<!-- div className="col-6 col-md-3 text-center order-1">
							<img src="{asset('assets/images/element/category-1.svg')}" alt="" />
						</div -->

						<!-- Content -->
						<div className="col-md-12 px-md-5 text-center position-relative order-md-2 mb-5 mb-md-0">

							<!-- Svg decoration -->
							<!-- figure className="position-absolute top-0 start-0">	
								<svg width="22px" height="22px" viewBox="0 0 22 22">
									<polygon className="fill-orange" points="22,8.3 13.7,8.3 13.7,0 8.3,0 8.3,8.3 0,8.3 0,13.7 8.3,13.7 8.3,22 13.7,22 13.7,13.7 22,13.7 "></polygon>
								</svg>
							</figure -->

							<!-- Svg decoration -->
							<!-- figure className="position-absolute top-0 start-50 translate-middle mt-n6 d-none d-md-block">
								<svg width="27px" height="27px">
									<path className="fill-purple" d="M13.122,5.946 L17.679,-0.001 L17.404,7.528 L24.661,5.946 L19.683,11.533 L26.244,15.056 L18.891,16.089 L21.686,23.068 L15.400,19.062 L13.122,26.232 L10.843,19.062 L4.557,23.068 L7.352,16.089 L-0.000,15.056 L6.561,11.533 L1.582,5.946 L8.839,7.528 L8.565,-0.001 L13.122,5.946 Z"></path>
								</svg>
							</figure -->


							<!-- Title -->
							<h1 className="mb-3">{% trans %}WHATDOYOUWATTOLEARN_KEY{% endtrans %}</h1>
							<p className="mb-3">{% trans %}WHATDOYOUWATTOLEARNDESCRIPTION_KEY{% endtrans %}</p>

							<!-- Search -->
							<form className="bg-body rounded p-2" action="{url("app_front_courses")}">
								<div className="input-group">
									<input required className="form-control border-0 me-1" name="search" type="search" placeholder="{% trans %}SEARCHCOURSES_KEY{% endtrans %}" />
									<button type="submit" className="btn btn-dark mb-0 rounded">{% trans %}SEARCH_KEY{% endtrans %}</button>
								</div>
							</form>
						</div>

						<!-- Image -->
						<!-- div className="col-6 col-md-3 text-center order-3">
							<img src="{asset('assets/images/element/category-2.svg')}" alt="" />
						</div -->
						
					</div> <!-- Row END -->
				</div>
			</div> <!-- Row END -->
		</div>
	</section>
	<!-- =======================
	Page Banner END -->

	<!-- =======================
	Categories START -->
	<section>
		<div className="container">
			<!-- Title -->
			<div className="row mb-4">
				<div className="col-lg-8 mx-auto text-center">
					<h2>{% trans %}CHOOSECATEGORY_KEY{% endtrans %}</h2>
					<p className="mb-0">{% trans %}CATEGORYDESCRIPTION_KEY{% endtrans %}</p>
				</div>
			</div>

			<div className="row g-4">
				{categories.map(category => (

					<!-- Item -->
					<div className="col-sm-6 col-md-4 col-xl-3">
						{include('front/includes/category/_item.html.twig')}
					</div>
				
))}
			</div>
		</div>
	</section>
	<!-- =======================
	Categories END -->

	<!-- =======================
	Action box START -->
	<section>
		<div className="container">
			<div className="row g-4">
				<!-- Action box item -->
				<div className="col-lg-6 position-relative overflow-hidden">
					<div className="bg-primary bg-opacity-10 rounded-3 p-5 h-100">
						<!-- Image -->
						<div className="position-absolute bottom-0 end-0 me-3">
							<img src="{asset('assets/images/element/08.svg')}" className="h-100px h-sm-200px" alt="" />
						</div>	
						<!-- Content -->
						<div className="row">
							<div className="col-sm-8 position-relative">
								<h3 className="mb-1">{% trans %}EARNCERTIFICATE_KEY{% endtrans %}</h3>
								<p className="mb-3 h5 fw-light lead">{% trans %}EARNCERTIFICATEDESCRIPTION_KEY{% endtrans %}</p>
								{/* <a href="#" className="btn btn-primary mb-0">{% trans %}VIEWPROGRAMS_KEY{% endtrans %}</a> */}
							</div>
						</div>
					</div>
				</div>

				<!-- Action box item -->
				<div className="col-lg-6 position-relative overflow-hidden">
					<div className="bg-secondary rounded-3 bg-opacity-10 p-5 h-100">
						<!-- Image -->
						<div className="position-absolute bottom-0 end-0 me-3">
							<img src="{asset('assets/images/element/15.svg')}" className="h-100px h-sm-200px" alt="" />
						</div>	
						<!-- Content -->
						<div className="row">
							<div className="col-sm-8 position-relative">
								<h3 className="mb-1">{% trans %}BESTRATEDCOURSES_KEY{% endtrans %}</h3>
								<p className="mb-3 h5 fw-light lead">{% trans %}BESTRATEDCOURSESDESCRIPTION_KEY{% endtrans %}</p>
								{/* <a href="#" className="btn btn-warning mb-0">{% trans %}BESTRATEDCOURSESBTN_KEY{% endtrans %}</a> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- =======================
	Action box END -->

{% endblock %}

    </>
  );
}
