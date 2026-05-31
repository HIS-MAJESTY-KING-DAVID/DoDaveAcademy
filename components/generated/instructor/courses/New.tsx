import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
{% extends "instructor/base.html.twig" %}

{% block subTitle %} - Courses {% endblock %}

{% block stylesheet %}
    <link rel="stylesheet" type="text/css" href="{asset('assets/vendor/aos/aos.css')}">
    <link rel="stylesheet" type="text/css" href="{asset('assets/vendor/glightbox/css/glightbox.css')}">
	<link rel="stylesheet" type="text/css" href="{asset('assets/vendor/quill/css/quill.snow.css')}">
	<link rel="stylesheet" type="text/css" href="{asset('assets/vendor/stepper/css/bs-stepper.min.css')}">
{% endblock %}

{% block script %}
    <script src="{asset('assets/vendor/aos/aos.js')}"></script>
    <script src="{asset('assets/vendor/glightbox/js/glightbox.js')}"></script>
    <script src="{asset('assets/vendor/quill/js/quill.min.js')}"></script>
    <script src="{asset('assets/vendor/stepper/js/bs-stepper.min.js')}"></script>

    <script>

        let faq_question = document.getElementById('faq_question');
        let faq_answer = document.getElementById('faq_answer')

        const removeLesson = (e) => {
            const chapIndex = e.currentTarget.dataset.chapIndex;
            const lessonIndex = e.currentTarget.dataset.index;
            document.getElementById('cours_chapitres_0_lessons_'+lessonIndex+'_')?.parentElement?.remove()
            e.currentTarget.parentElement?.parentElement?.parentElement?.remove();
        }

        const showEditChapModal = (e) => {
            const chapIndex = e.currentTarget.dataset.chapiter;
            document.getElementById('chapiter_title').value = document.getElementById('cours_chapitres_'+chapIndex+'_title').value
            document.getElementById('description_chapitre').value = document.getElementById('cours_chapitres_'+chapIndex+'_description').value
            const updateChapEl = document.getElementById('updateChap');
            if (updateChapEl) {
                updateChapEl.style.display = 'none';
                updateChapEl.style.display = 'block';
                updateChapEl.dataset.chapIndex = chapIndex;
            }
        }

        const updateChap = (e) => {
            const chapIndex = e.currentTarget.dataset.chapIndex;
            document.getElementById('cours_chapitres_'+chapIndex+'_title').value = document.getElementById('chapiter_title').value
            document.getElementById('cours_chapitres_'+chapIndex+'_description').value = document.getElementById('description_chapitre').value
            
            const headingBtn = document.querySelector('#heading-'+chapIndex+' button');
            if (headingBtn) headingBtn.textContent = document.getElementById('chapiter_title').value;
            const collapseDesc = document.querySelector('#collapse-'+chapIndex+' .description');
            if (collapseDesc) collapseDesc.textContent = document.getElementById('description_chapitre').value;

            const addLectureModal = document.getElementById('addLecture');
            if (addLectureModal) addLectureModal.classList.remove('show');
            const updateChapEl = document.getElementById('updateChap');
            if (updateChapEl) {
                updateChapEl.style.display = '';
                updateChapEl.style.display = 'none';
            }
            document.getElementById('chapiter_title').value = ''
            document.getElementById('description_chapitre').value = ''
        }

        const showEditLessonModal = (e) => {
            const chapIndex = e.currentTarget.dataset.chapIndex;
            const lessonIndex = e.currentTarget.dataset.index;
            
            const lesson_form_title = document.getElementById('cours_chapitres_'+chapIndex+'_lessons_'+lessonIndex+'_title').value;
            const lesson_form_content = document.getElementById('cours_chapitres_'+chapIndex+'_lessons_'+lessonIndex+'_content').value;
            const lesson_form_videoLink = document.getElementById('cours_chapitres_'+chapIndex+'_lessons_'+lessonIndex+'_videoLink').value;
            const isPremium = document.getElementById('cours_chapitres_'+chapIndex+'_lessons_'+lessonIndex+'_isPremium').value;
          
            document.getElementById('lesson_form_title').value = lesson_form_title;
            document.getElementById('lesson_form_videoLink').value = lesson_form_videoLink;
            const ckeIframe = document.querySelector('#cke_lesson_form_content iframe');
            if (ckeIframe) {
                const ckeBody = ckeIframe.contentDocument?.querySelector('body');
                if (ckeBody) ckeBody.innerHTML = lesson_form_content;
            }
            document.getElementById('cours_chapitres_'+chapIndex+'_lessons_'+lessonIndex+'_isPremium').value = isPremium;

            const editLessonBtn = document.getElementById('editLessonBtn');
            if (editLessonBtn) {
                editLessonBtn.dataset.index = String(lessonIndex);
                editLessonBtn.dataset.chapiter = String(chapIndex);
                editLessonBtn.dataset.titleReference = e.currentTarget.dataset.titleReference || '';
                editLessonBtn.style.display = 'block';
            }
            const saveLessonBtn = document.getElementById('saveLessonBtn');
            if (saveLessonBtn) saveLessonBtn.style.display = 'none';

            const addTopicModal = document.getElementById('addTopic');
            if (addTopicModal) addTopicModal.classList.add('show');
        }

        const editLesson = (e) => {
            e.preventDefault();
            const chapIndex = e.currentTarget.dataset.chapiter;
            const lessonIndex = e.currentTarget.dataset.index;
            const lesson_form_title = document.getElementById('lesson_form_title').value;
            const lesson_form_videoLink = document.getElementById('lesson_form_videoLink').value;
            const ckeIframe = document.querySelector('#cke_lesson_form_content iframe');
            let lesson_form_content = '';
            if (ckeIframe) {
                const ckeBody = ckeIframe.contentDocument?.querySelector('body');
                if (ckeBody) lesson_form_content = ckeBody.innerHTML;
            }
            const isPremium1 = document.getElementById('isPremium1');
            const isPremium = isPremium1 && isPremium1.checked ? 0 : 1;
            document.getElementById('cours_chapitres_'+chapIndex+'_lessons_'+lessonIndex+'_title').value = lesson_form_title;
            document.getElementById('cours_chapitres_'+chapIndex+'_lessons_'+lessonIndex+'_content').value = lesson_form_content;
            document.getElementById('cours_chapitres_'+chapIndex+'_lessons_'+lessonIndex+'_videoLink').value = lesson_form_videoLink;
            document.getElementById('cours_chapitres_'+chapIndex+'_lessons_'+lessonIndex+'_isPremium').value = isPremium;

            const titleRef = document.getElementById(e.currentTarget.dataset.titleReference);
            if (titleRef) titleRef.textContent = lesson_form_title;

            document.getElementById('lesson_form_title').value = '';
            document.getElementById('lesson_form_videoLink').value = ''
            if (ckeIframe) {
                const ckeBody = ckeIframe.contentDocument?.querySelector('body');
                if (ckeBody) ckeBody.innerHTML = '';
            }
            if (isPremium1) {
                isPremium1.checked = true;
                isPremium1.checked = false;
            }

            const addTopicModal = document.getElementById('addTopic');
            if (addTopicModal) addTopicModal.classList.remove('show');
            const editLessonBtn = document.getElementById('editLessonBtn');
            if (editLessonBtn) editLessonBtn.style.display = 'none';
            const saveLessonBtn = document.getElementById('saveLessonBtn');
            if (saveLessonBtn) saveLessonBtn.style.display = 'block';
        }

        const addLesson = (e) => {
            const lessonCollectionHolder = document.getElementById(e.currentTarget.dataset.prototypeContainer)
            if (lessonCollectionHolder.dataset.index == undefined) {
                lessonCollectionHolder.setAttribute('data-index', 0);
            }

            const chapIndex = e.currentTarget.dataset.chapiter;
            const lessonIndex = lessonCollectionHolder.dataset.index;

            const lesson = document.createElement('div');
            lesson.style = 'display: none';
            lesson.innerHTML = lessonCollectionHolder
                .dataset
                .prototype
                .replace(
                    /__name__/g,
                    lessonIndex
                );
            
            lessonCollectionHolder.appendChild(lesson);

            const lesson_form_title = document.getElementById('lesson_form_title').value;
            const lesson_form_videoLink = document.getElementById('lesson_form_videoLink').value
            const ckeIframe = document.querySelector('#cke_lesson_form_content iframe');
            let lesson_form_content = '';
            if (ckeIframe) {
                const ckeBody = ckeIframe.contentDocument?.querySelector('body');
                if (ckeBody) lesson_form_content = ckeBody.innerHTML;
            }

            const isPremium1 = document.getElementById('isPremium1');
            const isPremium = isPremium1 && isPremium1.checked ? 0 : 1;

            document.getElementById('cours_chapitres_'+chapIndex+'_lessons_'+lessonIndex+'_title').value = lesson_form_title;
            document.getElementById('cours_chapitres_'+chapIndex+'_lessons_'+lessonIndex+'_content').value = lesson_form_content;
            document.getElementById('cours_chapitres_'+chapIndex+'_lessons_'+lessonIndex+'_videoLink').value = lesson_form_videoLink;
            document.getElementById('cours_chapitres_'+chapIndex+'_lessons_'+lessonIndex+'_isPremium').value = isPremium;

            fetch('{path("app_instructor_add_lesson")}', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: new URLSearchParams({'title': lesson_form_title, 'chapIndex': chapIndex, 'videoLink': lesson_form_videoLink, 'description': lesson_form_content, 'index': lessonIndex})
            }).then(function() {
                const container = document.getElementById('lessons-container-'+chapIndex);
                if (container) container.insertAdjacentHTML('beforeend', '<div>' + '{path("app_instructor_add_lesson")}' + '</div>');
                document.querySelectorAll('.delete-lesson-btn').forEach(btn => { btn.addEventListener("click", removeLesson) });
                document.querySelectorAll('.edit-lesson-btn').forEach(btn => { btn.addEventListener("click", showEditLessonModal) });
            }).catch(function(err) {
                console.error('Error adding lesson:', err);
            });
            
            lessonCollectionHolder.dataset.index++;

            const addTopicModal = document.getElementById('addTopic');
            if (addTopicModal) addTopicModal.classList.remove('show');

            document.getElementById('lesson_form_title').value = '';
            document.getElementById('lesson_form_videoLink').value = ''
            if (ckeIframe) {
                const ckeBody = ckeIframe.contentDocument?.querySelector('body');
                if (ckeBody) ckeBody.innerHTML = '';
            }
            if (isPremium1) {
                isPremium1.checked = true;
                isPremium1.checked = false;
            }
        }

        const addChapiter = (e) => {
            const collectionHolder = document.querySelector('.' + e.currentTarget.dataset.collectionHolderClass);

            const item = document.createElement('div');
            item.style = 'display: none'
            item.innerHTML = collectionHolder
                .dataset
                .prototype
                .replace(
                    /__name__/g,
                    collectionHolder.dataset.index
                );

            const chapiter_title = document.getElementById('chapiter_title').value;
            const chapiter_description = document.getElementById('description_chapitre').value;

            collectionHolder.appendChild(item);
            var index = collectionHolder.dataset.index;

            document.getElementById('cours_chapitres_' + index + '_title').value = chapiter_title
            document.getElementById('cours_chapitres_' + index + '_description').value = chapiter_description

            const lessonHolder = document.getElementById('cours_chapitres_' + index + '_lessons')
            const lessonsEl = document.getElementById('cours_chapitres_' + index + '_lessons');
            if (lessonsEl) {
                lessonsEl.dataset.prototype = lessonHolder.dataset.prototype.replaceAll(
                    '[lessons]['+index+']', 
                    '[lessons][__name__]').replaceAll(
                        '_lessons_'+index+'_', 
                        '_lessons___name___'
                    ).replace('lessons_'+index, 'lessons___name___');
            }

            collectionHolder.dataset.index++;

            fetch('{path("app_instructor_add_chap")}', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: new URLSearchParams({'title': chapiter_title, 'description': chapiter_description, 'index': index})
            }).then(function(response) {
                return response.text();
            }).then(function(data) {
                const accordion = document.getElementById('accordionExample2');
                if (accordion) accordion.insertAdjacentHTML('beforeend', data);
                document.querySelectorAll('.add-lesson-btn').forEach(btn => {
                    btn.addEventListener("click", updateSaveBtnAtr)
                });
                document.querySelectorAll('.edit-chapitre-btn').forEach(btn => {
                    btn.addEventListener("click", showEditChapModal)
                });
                
                document.querySelectorAll('.delete-chapitre-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        document.getElementById(e.currentTarget.dataset.container).remove();
                        const parent = e.currentTarget.parentElement?.parentElement?.parentElement;
                        if (parent) parent.remove();
                        return false;
                    })
                });
            }).catch(function() {
                alert('Error');
            });

            document.getElementById('chapiter_title').value = '';
            document.getElementById('description_chapitre').value = '';

            const addLectureModal = document.getElementById('addLecture');
            if (addLectureModal) addLectureModal.classList.remove('show');
        };

        const updateSaveBtnAtr = (e) => {
            const btn = document.getElementById('saveLessonBtn')
            btn.setAttribute('data-index', e.currentTarget.dataset.index);
            btn.setAttribute('data-chapiter', e.currentTarget.dataset.chapiter);
            btn.setAttribute('data-prototype-container', e.currentTarget.dataset.prototypeContainer)
            const editLessonBtn = document.getElementById('editLessonBtn');
            if (editLessonBtn) editLessonBtn.style.display = 'none';
            const saveLessonBtn = document.getElementById('saveLessonBtn');
            if (saveLessonBtn) saveLessonBtn.style.display = 'block';
        }

        const showaddFAQForm = (e) => {
            document.querySelectorAll('.edit_faq_btn').forEach(function(el) { el.style.display = 'none'; });
            document.querySelectorAll('.add_faq_btn').forEach(function(el) { el.style.display = 'block'; });
            faq_question.value = '';
            faq_answer.value = '';
        }

        const addFAQ = (e) => {
            const collectionHolder = document.getElementById(e.currentTarget.dataset.collectionHolderId);

            const item = document.createElement('div');
            item.style = 'display: none'
            item.innerHTML = collectionHolder
                .dataset
                .prototype
                .replace(
                    /__name__/g,
                    collectionHolder.dataset.index
                );
            collectionHolder.appendChild(item);

            const index = collectionHolder.dataset.index
            collectionHolder.dataset.index++;

            document.getElementById('cours_fAQs_'+index+'_question').value = faq_question.value;
            document.getElementById('cours_fAQs_'+index+'_answer').value = faq_answer.value;

            fetch('{path("app_instructor_add_faq")}', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: new URLSearchParams({'index': index, 'question': faq_question.value, 'answer': faq_answer.value})
            }).then(function() {
                document.querySelectorAll('.delete-faq').forEach(btn => {btn.addEventListener("click", deleteFAQ)});
                document.querySelectorAll('.edit-faq').forEach(btn => {btn.addEventListener("click", showEditFAQForm)});
            }).catch(function() {
                alert('Error');
            });

            faq_answer.value = ''
            faq_question.value = ''
            const addQuestionModal = document.getElementById('addQuestion');
            if (addQuestionModal) addQuestionModal.classList.remove('show');
        }

        const showEditFAQForm = (e) => {
            document.querySelectorAll('.edit_faq_btn').forEach(function(el) { el.style.display = 'block'; });
            document.querySelectorAll('.add_faq_btn').forEach(function(el) { el.style.display = 'none'; });

            faq_question.value = document.getElementById('cours_fAQs_'+e.currentTarget.dataset.index+'_question').value
            faq_answer.value = document.getElementById('cours_fAQs_'+e.currentTarget.dataset.index+'_answer').value
            const editFaqBtn = document.getElementById('edit_faq_btn');
            if (editFaqBtn) editFaqBtn.dataset.index = e.currentTarget.dataset.index;
        }

        const deleteFAQ = (e) => {
            const faqEl = document.getElementById('cours_fAQs_'+e.currentTarget.dataset.index);
            if (faqEl) faqEl.parentElement?.remove();
            const faqItem = document.getElementById('faq-'+e.currentTarget.dataset.index);
            if (faqItem) faqItem.remove();
        }

        const editFAQ = (e) => {
            const index = e.currentTarget.dataset.index
            document.getElementById('cours_fAQs_'+index+'_question').value = faq_question.value;
            document.getElementById('cours_fAQs_'+index+'_answer').value = faq_answer.value;

            const faqQuestion = document.querySelector('#faq-'+index+' .question');
            if (faqQuestion) faqQuestion.textContent = faq_question.value;
            const faqAnswer = document.querySelector('#faq-'+index+' .answer');
            if (faqAnswer) faqAnswer.textContent = faq_answer.value;

            faq_answer.value = ''
            faq_question.value = ''
            const addQuestionModal = document.getElementById('addQuestion');
            if (addQuestionModal) addQuestionModal.classList.remove('show');
        }

        document
        .querySelectorAll('.add_chapiter_btn')
        .forEach(btn => {
            btn.addEventListener("click", addChapiter)
        });

        document
        .querySelectorAll('.edit_chapiter_btn')
        .forEach(btn => {
            btn.addEventListener("click", updateChap)
        });

        document
        .querySelectorAll('.add_lesson_btn')
        .forEach(btn => {
            btn.addEventListener("click", addLesson)
        });

        document.querySelectorAll('.edit_lesson_btn').forEach(btn => {
                btn.addEventListener("click", editLesson)
            }
        );

        document.querySelectorAll('.add_faq_btn').forEach(btn => {
                btn.addEventListener("click", addFAQ)
            }
        );

        document.querySelectorAll('.edit_faq_btn').forEach(btn => {
                btn.addEventListener("click", editFAQ)
            }
        );

        document.querySelectorAll('.new-chapitre').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const updateChapEl = document.getElementById('updateChap');
                if (updateChapEl) {
                    updateChapEl.style.display = '';
                    updateChapEl.style.display = 'none';
                }
            });
        })

        

    </script>
{% endblock %}

{% block pageContent %}

    <!-- =======================
    Steps START -->
    <section>
        <div className="container">
            <div className="row">
                <div className="col-md-8 mx-auto text-center">
                    <!-- Content -->
                    <p className="text-center">Use this interface to add a new Course to the portal. Once you are done adding the item it will be reviewed for quality. If approved, your course will appear for sale and you will be informed by email that your course has been accepted.</p>
                </div>
            </div>

            <div className="card bg-transparent border rounded-3 mb-5">
                <div id="stepper" className="bs-stepper stepper-outline">
                    <!-- Card header -->
                    <div className="card-header bg-light border-bottom px-lg-5">
                        <!-- Step Buttons START -->
                        <div className="bs-stepper-header" role="tablist">
                            <!-- Step 1 -->
                            <div className="step" data-target="#step-1">
                                <div className="d-grid text-center align-items-center">
                                    <button type="button" className="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger1" aria-controls="step-1">
                                        <span className="bs-stepper-circle">1</span>
                                    </button>
                                    <h6 className="bs-stepper-label d-none d-md-block">Course details</h6>
                                </div>
                            </div>
                            <div className="line"></div>

                            <!-- Step 2 -->
                            <div className="step" data-target="#step-2">
                                <div className="d-grid text-center align-items-center">
                                    <button type="button" className="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger2" aria-controls="step-2">
                                        <span className="bs-stepper-circle">2</span>
                                    </button>
                                    <h6 className="bs-stepper-label d-none d-md-block">Course media</h6>
                                </div>
                            </div>
                            <div className="line"></div>

                            <!-- Step 3 -->
                            <div className="step" data-target="#step-3">
                                <div className="d-grid text-center align-items-center">
                                    <button type="button" className="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger3" aria-controls="step-3">
                                        <span className="bs-stepper-circle">3</span>
                                    </button>
                                    <h6 className="bs-stepper-label d-none d-md-block">Curriculum</h6>
                                </div>
                            </div>
                            <div className="line"></div>

                            <!-- Step 4 -->
                            <div className="step" data-target="#step-4">
                                <div className="d-grid text-center align-items-center">
                                    <button type="button" className="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger4" aria-controls="step-4">
                                        <span className="bs-stepper-circle">4</span>
                                    </button>
                                    <h6 className="bs-stepper-label d-none d-md-block">Additional information</h6>
                                </div>
                            </div>
                        </div>
                        <!-- Step Buttons END -->
                    </div>

                    <!-- Card body START -->
                    <div className="card-body">
                        <!-- Step content START -->
                        <div className="bs-stepper-content">
                            {form_start(form)}

                                <!-- Step 1 content START -->
                                <div id="step-1" role="tabpanel" className="content fade" aria-labelledby="steppertrigger1">
                                    <!-- Title -->
                                    <h4>Course details</h4>

                                    <hr /> <!-- Divider -->

                                    <!-- Basic information START -->
                                    <div className="row g-4">
                                        <!-- Course title -->
                                        <div className="col-12">
                                            {form_row(form.intitule)}
                                        </div>

                                        <!-- Short description -->
                                        <div className="col-12">
                                            {form_row(form.description)}
                                        </div>

                                        <!-- Course category -->
                                        <div className="col-md-6">
                                            {form_row(form.categorie)}
                                        </div>

                                        <!-- Course level -->
                                        <div className="col-md-6">
                                            {form_row(form.niveauDifficulte)}
                                        </div>

                                        <!-- Course category -->
                                        <div className="col-md-12">
                                            {form_row(form.classe)}
                                        </div>

                                        <!-- Language -->
                                        <div className="col-md-6">
                                            {form_row(form.language)}
                                        </div>

                                        <!-- Switch -->
                                        <div className="col-md-6 d-flex align-items-center justify-content-start mt-5">
                                            <div className="form-check form-switch form-check-md">
                                                {form_row(form.isFree)}    
                                            </div>
                                        </div>

                                        <!-- Course price -->
                                        <div className="col-md-4">
                                            {form_row(form.montantAbonnement)}
                                        </div>

                                        <!-- Course time -->
                                        <div className="col-md-4">
                                            {form_row(form.dureeApprentissage)}
                                        </div>

                                        <!-- Total lecture -->
                                        <div className="col-md-4">
                                            {form_row(form.numberOfLessons)}
                                        </div>
                                        
                                        <!-- Course description -->
                                        <div className="col-12">
                                            {form_row(form.content)}
                                        </div>	

                                        <!-- Step 1 button -->
                                        <div className="d-flex justify-content-end mt-3">
                                            <button type="button" className="btn btn-primary next-btn mb-0">Next</button>
                                        </div>
                                    </div>
                                    <!-- Basic information START -->
                                </div>
                                <!-- Step 1 content END -->

                                <!-- Step 2 content START -->
                                <div id="step-2" role="tabpanel" className="content fade" aria-labelledby="steppertrigger2">
                                    <!-- Title -->
                                    <h4>Course media</h4>

                                    <hr /> <!-- Divider -->

                                    <div className="row">
                                        <!-- Upload image START -->
                                        <div className="col-12">
                                            <div className="text-center justify-content-center align-items-center p-4 p-sm-5 border border-2 border-dashed position-relative rounded-3">
                                                <!-- Image -->
                                                <img src="{asset('assets/images/element/gallery.svg')}" className="h-50px" alt="" />
                                                <div>
                                                    <h6 className="my-2">Upload course image here, or<a href="#!" className="text-primary"> Browse</a></h6>
                                                    <label style="cursor:pointer;">
                                                        <span> 
                                                            {form_widget(form.media.imageFileUpload)}
                                                        </span>
                                                    </label>
                                                        <p className="small mb-0 mt-2"><b>Note:</b> Only JPG, JPEG and PNG. Our suggested dimensions are 600px * 450px. Larger image will be cropped to 4:3 to fit our thumbnails/previews.</p>
                                                </div>	
                                            </div>

                                            <!-- Button -->
                                            <div className="d-sm-flex justify-content-end mt-2">
                                                <button type="button" className="btn btn-sm btn-danger-soft mb-3">Remove image</button>
                                            </div>
                                        </div>
                                        <!-- Upload image END -->

                                        <!-- Upload video START -->
                                        <div className="col-12">
                                            <h5>Upload video</h5>
                                            <!-- Input -->
                                            <div className="col-12 mt-4 mb-5">
                                                {form_row(form.media.videoUrl)}
                                            </div>
                                            <div className="position-relative my-4">
                                                <hr />
                                                <p className="small position-absolute top-50 start-50 translate-middle bg-body px-3 mb-0">Or</p>
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label">Upload video</label>
                                                <div className="input-group mb-3">
                                                    {form_row(form.media.mp4FileUpload)}
                                                </div>
                                                <div className="input-group mb-3">
                                                    {form_row(form.media.webMFileUpload)}
                                                </div>
                                                <div className="input-group mb-3">
                                                    {form_row(form.media.oggFileUpload)}
                                                </div>
                                            </div>

                                        </div>
                                        <!-- Upload video END -->

                                        <!-- Step 2 button -->
                                        <div className="d-flex justify-content-between mt-3">
                                            <button type="button" className="btn btn-secondary prev-btn mb-0">Previous</button>
                                            <button type="button" className="btn btn-primary next-btn mb-0">Next</button>
                                        </div>
                                    </div>
                                </div>
                                <!-- Step 2 content END -->

                                <!-- Step 3 content START -->
                                <div id="step-3" role="tabpanel" className="content fade" aria-labelledby="steppertrigger3">
                                    <!-- Title -->
                                    <h4>Curriculum</h4>

                                    <hr /> <!-- Divider -->

                                    <div className="row">
                                        <!-- Add lecture Modal button -->
                                        <div className="d-sm-flex justify-content-sm-between align-items-center mb-3">
                                            <h5 className="mb-2 mb-sm-0">Upload Lecture</h5>
                                            <a href="#" className="btn btn-sm btn-primary-soft new-chapitre mb-0" data-bs-toggle="modal" data-bs-target="#addLecture"><i className="bi bi-plus-circle me-2"></i>Add Chapiter</a>
                                        </div>
                
                                        <!-- Edit lecture START -->
                                        <div className="accordion accordion-icon accordion-bg-light chapiters" id="accordionExample2" 
                                            data-index="{form.chapitres|length > 0 ? form.chapitres|last.vars.name + 1 : 0}"
                                            data-prototype="{form_widget(form.chapitres.vars.prototype)|e('html_attr')}">
                                            
                
                                        </div>
                                        <!-- Edit lecture END -->

                                        <!-- Step 3 button -->
                                        <div className="d-flex justify-content-between">
                                            <button type="button" className="btn btn-secondary prev-btn mb-0">Previous</button>
                                            <button type="button" className="btn btn-primary next-btn mb-0">Next</button>
                                        </div>
                                    </div>
                                </div>
                                <!-- Step 3 content END -->

                                <!-- Step 4 content START -->
                                <div id="step-4" role="tabpanel" className="content fade" aria-labelledby="steppertrigger4">
                                    <!-- Title -->
                                    <h4>Additional information</h4>

                                    <hr /> <!-- Divider -->

                                    <div className="row g-4">
                                        
                                        <!-- Edit faq START -->
                                        <div className="col-12">
                                            <div className="bg-light border rounded p-2 p-sm-4">
                                                <div className="d-sm-flex justify-content-sm-between align-items-center mb-3">
                                                    <h5 className="mb-2 mb-sm-0">Upload FAQs</h5>
                                                    <a href="#" className="btn btn-sm btn-primary-soft mb-0" data-bs-toggle="modal" data-bs-target="#addQuestion"><i className="bi bi-plus-circle me-2"></i>Add Question</a>
                                                </div>
                                                <div className="row g-4" id="faqs" 
                                                data-index="{form.fAQs|length > 0 ? form.fAQs|last.vars.name + 1 : 0}"
                                                data-prototype="{form_widget(form.fAQs.vars.prototype)|e('html_attr')}"
                                                >
                                                    
                                                </div>
                                            </div>	
                                        </div>
                                        <!-- Edit faq END -->

                                        <!-- Tags START -->
                                        <div className="col-12">
                                            <div className="bg-light border rounded p-4">
                                                <h5 className="mb-0">Tags</h5>
                                                <!-- Comment -->
                                                <div className="mt-3">
                                                    {form_row(form.tags)}
                                                    <span className="small">Maximum of 14 keywords. Keywords should all be in lowercase and separated by commas. e.g. javascript, react, marketing</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Tags START -->

                                        <!-- Step 4 button -->
                                        <div className="d-md-flex justify-content-between align-items-start mt-4">
                                            <button type="button" className="btn btn-secondary prev-btn mb-2 mb-md-0">Previous</button>
                                            <div className="text-md-end">
                                                <button type="submit" className="btn btn-success mb-2 mb-sm-0">Submit a Course</button>
                                                <p className="mb-0 small mt-1">Once you click "Submit a Course", your course will be uploaded and marked as pending for review.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Step 4 content END -->

                            {form_end(form)}
                        </div>
                    </div>
                    <!-- Card body END -->
                </div>
            </div>
        </div>
    </section>
    <!-- =======================
    Steps END -->

    
    <div className="modal fade modal-lg" id="addLecture" tabindex="-1" aria-labelledby="addLectureLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header bg-dark">
                    <h5 className="modal-title text-white" id="addLectureLabel">Add Chapiter</h5>
                    <button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                </div>
                <div className="modal-body">
                    <form className="row text-start g-3">
                        <!-- Course name -->
                        <div className="col-12">
                            <label className="form-label">Chapiter title <span className="text-danger">*</span></label>
                            <input type="text" id="chapiter_title" className="form-control" placeholder="Enter course title" />
                        </div>
                        <!-- Course name -->
                        <div className="col-12">
                            <label className="form-label">Chapiter description <span className="text-danger">*</span></label>
                            <textarea id="description_chapitre" cols="30" rows="3" className="form-control" placeholder="Enter course description"></textarea>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger-soft my-0" data-bs-dismiss="modal">Close</button>
                    <button type="button" id="createChap" className="btn btn-success my-0 add_chapiter_btn" data-collection-holder-className="chapiters">Save Chapiter</button>
                    <button type="button" id="updateChap" data-chap-index="" className="btn btn-success my-0 edit_chapiter_btn" data-collection-holder-className="chapiters" style="display: none;">Update Chapiter</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Popup modal for add topic START -->
    <div className="modal modal-lg fade" id="addTopic" tabindex="-1" aria-labelledby="addTopicLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header bg-dark">
                    <h5 className="modal-title text-white" id="addTopicLabel">Add topic</h5>
                    <button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                </div>
                <div className="modal-body">
                    <form className="row text-start g-3">
                        <!-- Topic name -->
                        <div className="col-md-6">
                            {form_row(lessonForm.title)}
                        </div>
                        <!-- Video link -->
                        <div className="col-md-6">
                            {form_row(lessonForm.videoLink)}
                        </div>
                        <!-- Description -->
                        <div className="col-12 mt-3">
                            {form_row(lessonForm.content)}
                        </div>
                        <!-- Buttons -->
                        <div className="col-6 mt-3">
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <!-- Free button -->
                                <input type="radio" className="btn-check" name="isPremium" id="isPremium1" checked="" />
                                <label className="btn btn-sm btn-light btn-primary-soft-check border-0 m-0" for="isPremium1">Free</label>
                                <!-- Premium button -->
                                <input type="radio" className="btn-check" name="isPremium" id="isPremium2" />
                                <label className="btn btn-sm btn-light btn-primary-soft-check border-0 m-0" for="isPremium2">Premium</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger-soft my-0" data-bs-dismiss="modal">Close</button>
                    <button type="button" data-index="" data-chapiter="" data-prototype-container="" className="btn btn-success my-0 add_lesson_btn" id="saveLessonBtn">Save lesson</button>
                    <button type="button" data-index="" data-title-reference="" data-chapiter="" data-prototype-container="" className="btn btn-success my-0 edit_lesson_btn" style="display: none;" id="editLessonBtn">Update lesson</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Popup modal for add topic END -->

    <!-- Popup modal for add faq START -->
    <div className="modal fade" id="addQuestion" tabindex="-1" aria-labelledby="addQuestionLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header bg-dark">
                <h5 className="modal-title text-white" id="addQuestionLabel">Add FAQ</h5>
                <button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
            </div>
            <div className="modal-body">
                <form className="row text-start g-3">
                            <!-- Question -->
                            <div className="col-12">
                                <label className="form-label">Question</label>
                                <input className="form-control" id="faq_question" type="text" placeholder="Write a question" />
                            </div>
                            <!-- Answer -->
                            <div className="col-12 mt-3">
                                <label className="form-label">Answer</label>
                                <textarea className="form-control" id="faq_answer" rows="4" placeholder="Write a answer" spellcheck="false"></textarea>
                            </div>
                        </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-danger-soft my-0" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-success my-0 add_faq_btn" data-collection-holder-id="faqs">Save topic</button>
                <button type="button" data-index="" className="btn btn-success my-0 edit_faq_btn" id="edit_faq_btn" style="display: none;">Update topic</button>
            </div>
        </div>
    </div>
    </div>
    <!-- Popup modal for add faq END -->
   <script>
    ( function() {
    var mathElements = [
        'math',
        'maction',
        'maligngroup',
        'malignmark',
        'menclose',
        'merror',
        'mfenced',
        'mfrac',
        'mglyph',
        'mi',
        'mlabeledtr',
        'mlongdiv',
        'mmultiscripts',
        'mn',
        'mo',
        'mover',
        'mpadded',
        'mphantom',
        'mroot',
        'mrow',
        'ms',
        'mscarries',
        'mscarry',
        'msgroup',
        'msline',
        'mspace',
        'msqrt',
        'msrow',
        'mstack',
        'mstyle',
        'msub',
        'msup',
        'msubsup',
        'mtable',
        'mtd',
        'mtext',
        'mtr',
        'munder',
        'munderover',
        'semantics',
        'annotation',
        'annotation-xml',
        'mprescripts',
        'none'
    ];

    CKEDITOR.replace( 'lesson_content', {
        extraPlugins: 'ckeditor_wiris',
        // For now, MathType is incompatible with CKEditor 4 file upload plugins.
        removePlugins: 'filetools,uploadimage,uploadwidget,uploadfile,filebrowser,easyimage',
        height: 320,
        // Update the ACF configuration with MathML syntax.
        extraAllowedContent: mathElements.join( ' ' ) + '(*)[*]{*};img[data-mathml,data-custom-editor,role](Wirisformula)'
    } );
}() );

   </script>
{% endblock %}

    </>
  );
}
