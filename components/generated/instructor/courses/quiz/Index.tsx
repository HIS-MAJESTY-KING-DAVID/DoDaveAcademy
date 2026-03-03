import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends "instructor/base.html.twig" %}

{% block subTitle %} - Courses {% endblock %}

{% block btnAction %}
    <a href="#" className="btn btn-sm btn-primary mb-0" data-bs-toggle="modal" data-bs-target="#addQuiz">Add New Quiz</a>
{% endblock %}

{% block pageContent %}

    <!-- Card START -->
    <div className="card border bg-transparent rounded-3">
        <!-- Card header START -->
        <div className="card-header bg-transparent border-bottom px-3">
            <div className="row g-4 align-items-center">
                <div className="col-md-2">
                    <img src="{asset('uploads/media/courses/' ~ imageFile)}" className="rounded-2" alt="Card image" />
                </div>
                <div className="col-md-10">
                    <!-- Title -->
                    <h3 className="card-title mb-0"><a href="#">{title}</a></h3>
                </div>
            </div>
        </div>
        <!-- Card header END -->

        <!-- Card body START -->
        <div className="card-body p-4">
            <!-- Accordion START -->
            <div className="accordion accordion-icon accordion-bg-light" id="accordionExample">
                {% set cmp = 1 %}
                {quizzes.map(quiz => (

                    <!-- Item -->
                    <div className="accordion-item mb-3">
                        <h6 className="accordion-header" id="headingOne{quiz.id}">
                            <button className="accordion-button rounded" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne{quiz.id}" aria-expanded="true" aria-controls="collapseOne{quiz.id}">
                                <span className="text-secondary fw-bold me-3">{cmp < 10 ? '0' ~ cmp : cmp}</span>  
                                <span className="fw-bold">{quiz.question|raw}</span> 
                            </button>
                        </h6>
                        <div id="collapseOne{quiz.id}" className="accordion-collapse collapse" aria-labelledby="headingOne{quiz.id}" data-bs-parent="#accordionExample">
                            <div className="accordion-body mt-3">
                                <!-- Answer options -->
                                <p className="mb-3"><b className="text-dark">A</b> {quiz.proposition1|raw}</p>
                                <p className="mb-3"><b className="text-dark">B</b> {quiz.proposition2|raw}</p>
                                <p className="mb-3"><b className="text-dark">C</b> {quiz.proposition3|raw}</p>
                                <p className="mb-3"><b className="text-dark">D</b> {quiz.proposition4|raw}</p>
                                <!-- Button -->
                                {/* <a href="#" className="btn btn-sm btn-success-soft mb-0" data-bs-toggle="modal" data-bs-target="#editQuestion{quiz.id}">Edit</a> */}
                                <a href="{url("app_instructor_courses_quiz_remove", {reference: quiz.reference, _token: csrf_token('deletequiz' ~ quiz.id), redirect_uri: deleteRedirectUri})}" className="btn btn-danger-soft btn-sm mb-0">Delete</a>
                            </div>
                        </div>
                    </div>
                    {% set cmp = cmp + 1 %}
                
))}

            </div>
            <!-- Accordion END -->
            
        </div>
        <!-- Card body START -->
    </div>
    <!-- Card END -->


    <!-- Add course modal START -->
    <div className="modal fade" id="addQuiz" tabindex="-1" aria-labelledby="addQuizLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
            {form_start(form)}
                <div className="modal-content">
                    <div className="modal-header bg-dark">
                        <h5 className="modal-title text-white" id="addQuizLabel">Add New Quiz</h5>
                        <button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                    </div>
                    <div className="modal-body">
                        <div className="row text-start g-3">

                            <!-- Question -->
                            <div className="col-12">
                                {form_row(form.question)}
                            </div>

                            <!-- Answer options START -->
                            <div className="col-12">
                                {form_row(form.proposition1)}
                            </div>

                            <div className="col-12">
                                {form_row(form.proposition2)}
                            </div>

                            <div className="col-12">
                                {form_row(form.proposition3)}
                            </div>

                            <div className="col-12">
                                {form_row(form.proposition4)}
                            </div>

                            <div className="col-md-12">
                                {form_row(form.propositionJuste)}
                            </div>
                            <!-- Answer options END -->
                        </div>
                    </div>
                    {form_rest(form)}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger-soft my-0" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-success my-0">Add Quiz</button>
                    </div>
                </div>
            {form_end(form)}
        </div>
    </div>
    <!-- Add course modal START -->

    {# {quizzes.map(quiz => (

        {include('instructor/courses/quiz/_edit_quiz_modal.html.twig')}
    
))} #}

{% endblock %}
    </>
  );
}
