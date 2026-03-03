import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends "front/base.html.twig" %}

{% block title %} - Courses{% endblock %}

{% block script %}
	
{% endblock %}

{% block mainContent %}
    
    <section className="bg-dark align-items-center d-flex" style="background:url({asset('assets/images/pattern/04.png')}) no-repeat center center; background-size:cover;">
        <!-- Main banner background image -->
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <!-- Title -->
                    <h1 className="text-white">{% trans %}EXAMS_KEY{% endtrans %}</h1>
                    <!-- Breadcrumb -->
                    <div className="d-flex">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb breadcrumb-dark breadcrumb-dots mb-0">
                                <li className="breadcrumb-item"><a href="{url("app_front")}">{% trans %}HOME_KEY{% endtrans %}</a></li>
                                <li className="breadcrumb-item active" aria-current="page">{% trans %}EXAMS_KEY{% endtrans %}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </section>
	
	<!-- Page content START -->
	<section className="pb-0 py-sm-5">
		<div className="container">
			<!-- Title and select START -->
			<div className="row g-3 align-items-center mb-4">
                {exams.getTotalItemCount && (

				<!-- Content -->
				<div className="col-md-5">
					<h4 className="mb-0">Showing {((exams.getCurrentPageNumber - 1) * exams.getItemNumberPerPage) + 1} to {exams.getItemNumberPerPage * exams.getCurrentPageNumber} of {exams.getTotalItemCount} result</h4>
				</div>
                
)}

				<!-- Select option -->
				<div className="col-md-7">
					<div className="row g-3 align-items-center justify-content-md-end me-auto">

						<!-- Advanced filter responsive toggler START -->
						<div className="col-4 text-md-end">
							<button className="btn btn-primary mb-0 d-xl-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
								<i className="fas fa-sliders-h me-1"></i> {% trans %}SHOWFILTER_KEY{% endtrans %}
							</button>
						</div>
						<!-- Advanced filter responsive toggler END -->

					</div>
				</div>

			</div>
			<!-- Title and select END -->

			<div className="row">
				<!-- Main content START -->
				<div className="col-xl-9 col-xxl-8">
					<!-- Course list START -->
					<div className="row g-4">
                        {exams.map(exam => (

						<!-- Card list START -->
						{include('front/exam/_item.html.twig')}
						<!-- Card list END -->
                        
) || (

                            <div className="text-center p-4 mb-5 mt-5">
                                <h2>{% trans %}EMPTY_KEY{% endtrans %}</h2>
                            </div>
                        
))}
					</div>
					<!-- Course list END -->
					<!-- Pagination START -->
					<div className="col-12">
						{knp_pagination_render(exams)}
					</div>
					<!-- Pagination END -->
				</div>
				<!-- Main content END -->

				<!-- Right sidebar START -->
				<div className="col-lg-3 col-xxl-4">
					<!-- Responsive offcanvas body START -->
					<div className="offcanvas-xl offcanvas-end" tabindex="-1" id="offcanvasSidebar">
						<div className="offcanvas-header bg-light">
							<h5 className="offcanvas-title" id="offcanvasNavbarLabel">{% trans %}ADVANCEFILTER_KEY{% endtrans %}</h5>
							<button  type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasSidebar" aria-label="Close"></button>
						</div>
						<div className="offcanvas-body p-3 p-xl-0">
							<form id="filter-form">
								<!-- Category START -->
								<div className="card card-body shadow p-4 mb-4">
									<!-- Title -->
									<h4 className="mb-4">{% trans %}CATEGORY_KEY{% endtrans %}</h4>
									<div className="row">
										<!-- Category group -->
										<div className="col-xxl-6">
											<div className="form-check">
												<input {sCategory is same as null ? 'checked' : ''} required name="category" className="form-check-input" type="radio" value="all" id="flexCheckDefaultall" />
												<label className="form-check-label" for="flexCheckDefaultall">{% trans %}ALL_KEY{% endtrans %}</label>
											</div>
											{% set i = 1 %}
											{categories.map(category => (

												{i <= (categories|length) / 2 && (

													<div className="form-check">
														<input {sCategory is same as category ? 'checked' :''} name="category" required data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title='{category.name}' className="form-check-input" type="radio" value="{category.slug}" id="flexCheckDefault{category.id}" />
														<label data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title='{category.name}' className="form-check-label" for="flexCheckDefault{category.id}">{category.name}</label>
													</div>
												
)}
												{% set i = i + 1 %}
											
))}
										</div>
	
										<!-- Category group -->
										<div className="col-xxl-6">
											{% set i = 1 %}
											{categories.map(category => (

												{i > (categories|length) / 2 && (

													<div className="form-check">
														<input {sCategory is same as category ? 'checked' : ''} name="category" required data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title='{category.name}' className="form-check-input" type="radio" value="{category.slug}" id="flexCheckDefault{category.id}" />
														<label data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title='{category.name}' title="{category.name}" className="form-check-label" for="flexCheckDefault{category.id}">{category.name|u.truncate(13)}</label>
													</div>
												
)}
												{% set i = i + 1 %}
											
))}
										</div>
									</div><!-- Row END -->
								</div>
								<!-- Category END -->

								<!-- Price START -->
								<div className="card card-body shadow p-4 mb-4">
									<!-- Title -->
									<h4 className="mb-3">{% trans %}SKILLLEVEL_KEY{% endtrans %}</h4>
									<ul className="list-inline mb-0">
										<!-- Price item -->
										<li className="list-inline-item">
											<input {skillLevel is same as null ? 'checked' : ''} type="radio" value="all" className="btn-check" name="skill" id="skill" />
											<label className="btn btn-light btn-primary-soft-check" for="skill">{% trans %}ALL_KEY{% endtrans %}</label>
										</li>
										{skillLevels.map(skill => (

											<!-- Price item -->
											<li className="list-inline-item">
												<input {skillLevel is same as skill ? 'checked' : ''} type="radio" className="btn-check" name="skill" value="{skill.slug}" id="skill{loop.index}" />
												<label className="btn btn-light btn-primary-soft-check" for="skill{loop.index}">{skill.name}</label>
											</li>
										
))}
									</ul>
								</div>
								<!-- Price END -->
		
								<!-- Price START -->
								<div className="card card-body shadow p-4 mb-4">
									<!-- Title -->
									<h4 className="mb-3">{% trans %}CLASSES_KEY{% endtrans %}</h4>
									<ul className="list-inline mb-0">
										<!-- Price item -->
										<li className="list-inline-item">
											<input {sClasse is same as null ? 'checked' : ''} checked type="radio" value="all" className="btn-check" name="classe" id="option" />
											<label className="btn btn-light btn-primary-soft-check" for="option">{% trans %}ALL_KEY{% endtrans %}</label>
										</li>
										{classes.map(classe => (

											<!-- Price item -->
											<li className="list-inline-item">
												<input {sClasse is same as classe ? 'checked' : ''} type="radio" className="btn-check" name="classe" value="{classe.slug}" id="option{loop.index}" />
												<label className="btn btn-light btn-primary-soft-check" for="option{loop.index}">{classe.name}</label>
											</li>
										
))}
									</ul>
								</div>
								<!-- Price END -->
		
								<!-- Language START -->
								<div className="card card-body shadow p-4 mb-4">
									<!-- Title -->
									<h4 className="mb-3">{% trans %}LANGUAGE_KEY{% endtrans %}</h4>
									<ul className="list-inline mb-0 g-3">
										<!-- Item -->
										<li className="list-inline-item mb-2">
											<input {language is same as null ? 'checked' : ''} value="all" checked type="radio" name="language" className="btn-check" id="btn-check-2" />
											<label className="btn btn-light btn-primary-soft-check" for="btn-check-2">{% trans %}ALL_KEY{% endtrans %}</label>
										</li>
										<!-- Item -->
										<li className="list-inline-item mb-2">
											<input  {language|upper is same as 'FRENCH' ? 'checked' : ''} name="language" value="French" type="radio" className="btn-check" id="btn-check-3" />
											<label className="btn btn-light btn-primary-soft-check" for="btn-check-3">{% trans %}FRENCH_KEY{% endtrans %}</label>
										</li>
										<!-- Item -->
										<li className="list-inline-item mb-2">
											<input {language|upper is same as 'ENGLISH' ? 'checked' : ''} value="English" name="language" type="radio" className="btn-check" id="btn-check-4" />
											<label className="btn btn-light btn-primary-soft-check" for="btn-check-4">{% trans %}ENGLISH_KEY{% endtrans %}</label>
										</li>
									</ul>
								</div>
								<!-- Language END -->
							</form>
							<!-- Form End -->
						</div>

						<!-- Button -->
						<div className="d-grid p-2 p-xl-0 bg-body text-center">
							<button className="btn btn-primary mb-0" type="button" onclick="$('#filter-form').submit()">{% trans %}FILTERRESULTS_KEY{% endtrans %}</button>
						</div>
					</div>
					<!-- Responsive offcanvas body END -->
				</div>
				<!-- Right sidebar END -->
			</div><!-- Row END -->
		</div>
	</section>
	<!-- Page content END -->

	{include('front/includes/_newsletterorange.html.twig')}

{% endblock %}

    </>
  );
}
