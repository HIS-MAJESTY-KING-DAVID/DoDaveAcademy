import React from 'react';
import Link from 'next/link';

export default function Courses(props: any) {
  return (
    <>
<div className="row p-4 g-4">
    <!-- Dropdown column item -->
    <div className="col-xl-6 col-xxl-3">
        <h6 className="mb-0">{% trans %}COURSESCATEGORY_KEY{% endtrans %}</h6>
        <hr />
        <ul className="list-unstyled">
            {categories.map(category => (

                <li> <a className="dropdown-item" href="{url("app_front_category_courses", {slug: category.slug})}">{category.name}</a> </li>
            
))}
            <li> 
                <a className="dropdown-item bg-primary text-primary bg-opacity-10 rounded-2 mb-0" href="{path('app_front_courses_category')}">{% trans %}VIEWALLCATEGORIES_KEY{% endtrans %}</a>
            </li>
        </ul>
    </div>
    
    <!-- Dropdown column item -->
    <div className="col-xl-6 col-xxl-3">
        <h6 className="mb-0">{% trans %}LASTCOURSES_KEY{% endtrans %}</h6>
        <hr />
        <!-- Dropdown item -->
        {% set icons = ['fa-book text-google-icon', 'fa-book text-linkedin', 'fa-book text-facebook', 'fa-book text-twitter', 'fa-book text-dribbble', 'fa-book-open text-linkedin', 'fa-book text-facebook', 'fa-book text-google-icon'] %}
        {lastCourses.map(course => (

            {loop.index <= 4 && (

            <div className="d-flex mb-4 position-relative">
                <h2 className="mb-0"><i className="fas fa-fw {icons[loop.index - 1]}"></i></h2>
                <div className="ms-2">
                    <a className="stretched-link h6 mb-0" href="{url("app_front_course_details", {slug: course.slug})}">{course.intitule|u.truncate(30, '...')}</a>
                    <p className="mb-0 small">{course.description|u.truncate(80, '...')}</p>
                </div>
            </div>
            
)}
            
        
))}
        <a className="dropdown-item bg-primary text-primary bg-opacity-10 rounded-2 mb-0" href="{path('app_front_courses')}">{% trans %}VIEWMORECOURSES_KEY{% endtrans %}</a>
    </div>

    <!-- Dropdown column item -->
    <div className="col-xl-6 col-xxl-3">
        <h6 className="mb-0">{% trans %}LASTCOURSES_KEY{% endtrans %}</h6>
        <hr />
        <!-- Dropdown item -->
        {lastCourses.map(course => (

            {loop.index > 4 && (

            <div className="d-flex mb-4 position-relative">
                <h2 className="mb-0"><i className="fas fa-fw {icons[loop.index - 1]}"></i></h2>
                <div className="ms-2">
                    <a className="stretched-link h6 mb-0" href="{url("app_front_course_details", {slug: course.slug})}">{course.intitule|u.truncate(30, '...')}</a>
                    <p className="mb-0 small">{course.description|u.truncate(80, '...')}</p>
                </div>
            </div>
            
)}
            
        
))}
    </div>

    <!-- Dropdown column item -->
    <div className="col-xl-6 col-xxl-3">
        <h6 className="mb-0">{% trans %}DOWNLOADKULMAPECK_KEY{% endtrans %}</h6>
        <hr />
        <!-- Image -->
        <img src="{asset('assets/images/element/14.svg')}" alt="" />

        <!-- Download button -->
        <div className="row g-2 justify-content-center mt-3">
        <!-- Google play store button -->
        <div className="col-6 col-sm-4 col-xxl-6">
            <a href="https://play.google.com/store/apps/details?id=com.thealphamerc.kulmapeck&pcampaignid=web_share"> <img src="{asset('assets/images/client/google-play.svg')}" className="btn-transition" alt="google-store" /> </a>
        </div>
        <!-- App store button -->
        <div className="col-6 col-sm-4 col-xxl-6">
            <a href="https://play.google.com/store/apps/details?id=com.thealphamerc.kulmapeck&pcampaignid=web_share"> <img src="{asset('assets/images/client/app-store.svg')}" className="btn-transition" alt="app-store" /> </a>
        </div>
        </div>
    </div>
</div>
    </>
  );
}
