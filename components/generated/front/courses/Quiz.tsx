import React from 'react';
import Link from 'next/link';

export default function Quiz(props: any) {
  return (
    <>
{% extends "front/base.html.twig" %}

{% block title %} - Quizzes{% endblock %}

{% block stylesheet %}
    <link rel="stylesheet" href="{asset('assets/vendor/stepper/css/bs-stepper.min.css')}">
{% endblock %}

{% block script1 %}{% endblock %}

{% block script %}
    <script src="{asset('assets/vendor/stepper/js/bs-stepper.min.js')}"></script>
    
    <script>
        const toogleRequiredAttr = (e) => {
            if ($(e.currentTarget).attr('type') == 'checkbox') {
                if ($(e.currentTarget).is(':checked')) {
                    $(e.currentTarget.dataset.parent + ' .btn-quiz-check').attr('required', false)
                } else {
                    let isChecked = false
                    $(e.currentTarget.dataset.parent + ' .btn-quiz-check').each((index, item) => {
                        if ($(item).is(':checked')) {
                            isChecked = true
                        }
                    })
                    if (isChecked) {
                        $(e.currentTarget.dataset.parent + ' .btn-quiz-check').attr('required', false)
                    } else {
                        $(e.currentTarget.dataset.parent + ' .btn-quiz-check').attr('required', true)
                    }
                }
            }
        }

        document.querySelectorAll('.btn-quiz-check').forEach(item => {
            item.addEventListener("change", toogleRequiredAttr)
        })
    </script>
{% endblock %}

{% block mainContent %}

    <!-- =======================
    Page content START -->
    <section className="pt-0">
        <div className="container">
            <div className="row">

                <!-- Main content START -->
                <div className="col-xl-12">
                    <!-- Course item START -->
                    <div className="card border">
        
                            <div className="card-header border-bottom">
                                <!-- Course list START -->
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="row g-0">
                                                <div className="col-md-2">
                                                    <img src="{asset('uploads/media/courses/' ~ cours.media.imageFile)}" className="rounded-2" alt="Card image" />
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="card-body">
                                                        <!-- Title -->
                                                        <h3 className="card-title"><a href="#">{chapitre is not same as null ? chapitre.title : cours.intitule}</a> / QUIZ</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Course list END -->
                            </div>

                            <div className="card-body">
                                <!-- Step content START -->
                                <div className="card bg-transparent border rounded-3 mb-1">
                                    <div id="stepper" className="bs-stepper stepper-outline">
                                        <!-- Card header -->
                                        <div className="card-header bg-light border-bottom px-lg-5">
                                            <!-- Step Buttons START -->
                                            <div className="bs-stepper-header" role="tablist">
                                                {quizzes.map(quiz => (

                                                    <div className="step" data-target="#step-{loop.index}">
                                                        <div className="d-grid text-center align-items-center">
                                                            <button type="button" className="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger{loop.index}" aria-controls="step-{loop.index}">
                                                                <span className="bs-stepper-circle">{loop.index}</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {not loop.last && (

                                                        <div className="line"></div>
                                                    
)}
                                                
))}

                                            </div>
                                            <!-- Step Buttons END -->
                                        </div>
                        
                                        <!-- Card body START -->
                                        <div className="card-body">
                                            {not isCorrectionMode && (

                                                <h6 className="text-danger text-end mb-0"><i className="bi bi-clock-history me-2"></i>Time Left: 00:01:30</h6>
                                            
)}
                                            {lecture is not same as null && (

                                                <h2 className="text-danger text-end mb-0 rounded">{lecture.note|number_format(2)} / 20</h2>
                                            
)}

                                            <!-- Step content START -->
                                            <div className="bs-stepper-content">
                                                {not isCorrectionMode && (

                                                    <form method="post" action="{submitUri}" onsubmit="return confirm('Confirmez-vous la soumission de ce quiz ?')">
                                                        <input type="hidden" name="_token" value="{csrf_token('postquiz' ~ cours.id)}" />
                                                        {quizzes.map(quiz => (

                                                            <div id="step-{loop.index}" role="tabpanel" className="content fade " aria-labelledby="steppertrigger{loop.index}">
                                                                <!-- Title -->
                                                                <h4>{quiz.question|raw}</h4>
                                                                {quiz.propositionJuste|length > 1 && (

                                                                    <div className="text-info alert alert-info"><i className="fas fa-info" style="font-size: 2em;"></i> Plusieurs réponses sont possibles pour cette question</div>
                                                                
)}
                                                                <input type="hidden" value="{quiz.id}" name="quizzes[{loop.index}][id]" />
                                                                <hr /> <!-- Divider -->
                                                                <div className="vstack gap-2 {quiz.propositionJuste|length > 1 ? 'checkbox' : ''}">
                                                                    <!-- Feed ques item -->
                                                                    <div>
                                                                        <input data-parent="#step-{loop.index}" required type="{quiz.propositionJuste|length  /> 1 ? 'checkbox' : 'radio'}" className="btn-check btn-quiz-check" value="1" name="quizzes[{loop.index}][reponses][]" id="quiz{quiz.id}option1">
                                                                        <label style="white-space: normal" className="btn btn-outline-primary w-100" for="quiz{quiz.id}option1">{quiz.proposition1|raw}</label>
                                                                    </div>
                                                                    <!-- Feed ques item -->
                                                                    <div>
                                                                        <input data-parent="#step-{loop.index}" required type="{quiz.propositionJuste|length  /> 1 ? 'checkbox' : 'radio'}" className="btn-check btn-quiz-check" value="2" name="quizzes[{loop.index}][reponses][]" id="quiz{quiz.id}option2">
                                                                        <label style="white-space: normal" className="btn btn-outline-primary w-100" for="quiz{quiz.id}option2">{quiz.proposition2|raw}</label>
                                                                    </div>
                                                                    <!-- Feed ques item -->
                                                                    <div>
                                                                        <input data-parent="#step-{loop.index}" required type="{quiz.propositionJuste|length  /> 1 ? 'checkbox' : 'radio'}" className="btn-check btn-quiz-check" value="3" name="quizzes[{loop.index}][reponses][]" id="quiz{quiz.id}option3">
                                                                        <label style="white-space: normal" className="btn btn-outline-primary w-100" for="quiz{quiz.id}option3">{quiz.proposition3|raw}</label>
                                                                    </div>
                                                                    <!-- Feed ques item -->
                                                                    <div>
                                                                        <input data-parent="#step-{loop.index}" required type="{quiz.propositionJuste|length  /> 1 ? 'checkbox' : 'radio'}" className="btn-check btn-quiz-check" value="4" name="quizzes[{loop.index}][reponses][]" id="quiz{quiz.id}option4">
                                                                        <label style="white-space: normal" className="btn btn-outline-primary w-100" for="quiz{quiz.id}option4">{quiz.proposition4|raw}</label>
                                                                    </div>
                                                                </div>

                                                                <!-- Step button -->
                                                                <div className="d-flex justify-content-center mt-3">
                                                                    {not loop.first && (

                                                                        <button type="button" className="btn btn-danger-soft prev-btn mb-0 " style="margin-right: 15px;">Prev question</button>
                                                                    
)}
                                                                    {not loop.last && (

                                                                        <button type="button" className="btn btn-primary-soft next-btn mb-0">Next question</button>
                                                                    
)}
                                                                    {loop.last && (

                                                                        <button type="submit" name="submit" className="btn btn-success-soft mb-0" style="margin-left: 15px;">Soumettre</button>
                                                                    
)}
                                                                </div>
                                                        
                                                            </div>
                                                        
))}
                                                    </form>
                                                
) || (

                                                    <div>
                                                        {nextQuizAt is not same as null && (

                                                            <div className="alert alert-info">
                                                                <p>Vous pourrez repasser le test à partir de <strong>{nextQuizAt|date('H:i:s')}</strong> le temps pour vous de reviser les parties du cours qui vous ont dérangé</p>
                                                            </div>
                                                        
)}
                                                        {quizzesResults.map(qr => (

                                                            {% set quiz = qr.quiz %}
                                                            <div id="step-{loop.index}" role="tabpanel" className="content fade " aria-labelledby="steppertrigger{loop.index}">
                                                                <!-- Title -->
                                                                <h4>{quiz.question|raw}</h4>
                                                                {quiz.propositionJuste|length > 1 && (

                                                                    <div className="text-info alert alert-info"><i className="fas fa-info" style="font-size: 2em;"></i>{% trans %}MANY_ANSWERS_POSSIBLE_KEY{% endtrans %}</div>
                                                                
)}
                                                                <hr /> <!-- Divider -->
                                                                <div className="vstack gap-2">
                                                                    <!-- Feed ques item -->
                                                                    <div>
                                                                        {% set className = 'btn-outline-primary' %}
                                                                        {% set value = 1 %}
                                                                        {value in quiz.propositionJuste and value in qr.result && (

                                                                            {% set className = 'btn-success' %}
                                                                        {% elseif value in quiz.propositionJuste and value not in qr.result %}
                                                                            {% set className = 'btn-secondary' %}
                                                                        {% elseif value not in quiz.propositionJuste and value in qr.result %}
                                                                            {% set className = 'btn-danger' %}
                                                                        
)}
                                                                        <input disabled {value in quiz.propositionJuste ? 'checked' : ''} required type="{quiz.propositionJuste|length  /> 1 ? 'checkbox' : 'radio'}" className="btn-check" id="quiz{quiz.id}option1">
                                                                        <label style="white-space: normal" className="btn {className} w-100" for="quiz{quiz.id}option1">{quiz.proposition1|raw}</label>
                                                                    </div>
                                                                    <!-- Feed ques item -->
                                                                    <div>
                                                                        {% set value = 2 %}
                                                                        {% set className = 'btn-outline-primary' %}
                                                                        {value in quiz.propositionJuste and value in qr.result && (

                                                                            {% set className = 'btn-success' %}
                                                                        {% elseif value in quiz.propositionJuste and not value not in qr.result %}
                                                                            {% set className = 'btn-secondary' %}
                                                                        {% elseif value not in quiz.propositionJuste and value in qr.result %}
                                                                            {% set className = 'btn-danger' %}
                                                                        
)}
                                                                        <input disabled {value in quiz.propositionJuste ? 'checked' : ''} required type="{quiz.propositionJuste|length  /> 1 ? 'checkbox' : 'radio'}" className="btn-check" value="2" name="quizzes[{loop.index}][reponses][]" id="quiz{quiz.id}option2">
                                                                        <label style="white-space: normal" className="btn {className} w-100" for="quiz{quiz.id}option2">{quiz.proposition2|raw}</label>
                                                                    </div>
                                                                    <!-- Feed ques item -->
                                                                    <div>
                                                                        {% set value = 3 %}
                                                                        {% set className = 'btn-outline-primary' %}
                                                                        {value in quiz.propositionJuste and value in qr.result && (

                                                                            {% set className = 'btn-success' %}
                                                                        {% elseif value in quiz.propositionJuste and not value not in qr.result %}
                                                                            {% set className = 'btn-secondary' %}
                                                                        {% elseif value not in quiz.propositionJuste and value in qr.result %}
                                                                            {% set className = 'btn-danger' %}
                                                                        
)}
                                                                        <input disabled {value in quiz.propositionJuste ? 'checked' : ''} required type="{quiz.propositionJuste|length  /> 1 ? 'checkbox' : 'radio'}" className="btn-check" value="3" name="quizzes[{loop.index}][reponses][]" id="quiz{quiz.id}option3">
                                                                        <label style="white-space: normal" className="btn {className} w-100" for="quiz{quiz.id}option3">{quiz.proposition3|raw}</label>
                                                                    </div>
                                                                    <!-- Feed ques item -->
                                                                    <div>
                                                                        {% set value = 4 %}
                                                                        {% set className = 'btn-outline-primary' %}
                                                                        {value in quiz.propositionJuste and value in qr.result && (

                                                                            {% set className = 'btn-success' %}
                                                                        {% elseif value in quiz.propositionJuste and not value not in qr.result %}
                                                                            {% set className = 'btn-secondary' %}
                                                                        {% elseif  value not in quiz.propositionJuste and value in qr.result %}
                                                                            {% set className = 'btn-danger' %}
                                                                        
)}
                                                                        <input disabled {value in quiz.propositionJuste ? 'checked' : ''} required type="{quiz.propositionJuste|length  /> 1 ? 'checkbox' : 'radio'}" className="btn-check" value="4" name="quizzes[{loop.index}][reponses][]" id="quiz{quiz.id}option4">
                                                                        <label style="white-space: normal" className="btn {className} w-100" for="quiz{quiz.id}option4">{quiz.proposition4|raw}</label>
                                                                    </div>
                                                                </div>

                                                                <!-- Step button -->
                                                                <div className="d-flex justify-content-center mt-3">
                                                                    {not loop.first && (

                                                                        <button type="button" className="btn btn-danger-soft prev-btn mb-0 " style="margin-right: 15px;">{% trans %}PREV_KEY{% endtrans %}</button>
                                                                    
)}
                                                                    {not loop.last && (

                                                                        <button type="button" className="btn btn-primary-soft next-btn mb-0">{% trans %}NEXT_KEY{% endtrans %}</button>
                                                                    
)}
                                                                </div>
                                                        
                                                            </div>
                                                        
))}
                                                    </div>
                                                
)}
                                            </div>
                                        </div>
                                        {isCorrectionMode && (

                                            <div className="card-footer">
                                                <a className="btn btn-primary-soft" href="{url("app_front_course_start", {slug: cours.slug})}">{% trans %}BACK_TO_COURSE_KEY{% endtrans %}Back to course</a>
                                            </div>
                                        
)}
                                        <!-- Card body END -->
                                    </div>
                                </div>		
                            </div>
                        
                    </div>
                    <!-- Course item END -->

                </div>
                <!-- Main content END -->

            </div> <!-- Row END -->
        </div>	
    </section>
    <!-- =======================
    Page content END -->
{% endblock %}

    </>
  );
}
