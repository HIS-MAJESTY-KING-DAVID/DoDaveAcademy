import React from 'react';
import Link from 'next/link';
import Script from 'next/script';

export default function Base(props: any) {
  return (
    <>
      {/* <!DOCTYPE html> */}
      {/* <html lang="en"> */}

      {/* <head> */}
        <title>DoDave Academy - admin </title>
        {/* Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="author" content="Webestica.com" />
        <meta name="description" content="Eduport- LMS, Education and Course Theme" />

        {/* Dark mode */}
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            const storedTheme = localStorage.getItem('theme')
    
            const getPreferredTheme = () => {
                if (storedTheme) {
                    return storedTheme
                }
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            }

            const setTheme = function (theme) {
                if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.setAttribute('data-bs-theme', 'dark')
                } else {
                    document.documentElement.setAttribute('data-bs-theme', theme)
                }
            }

            setTheme(getPreferredTheme())

            window.addEventListener('DOMContentLoaded', () => {
                var el = document.querySelector('.theme-icon-active');
                if(el != 'undefined' && el != null) {
                    const showActiveTheme = theme => {
                    const activeThemeIcon = document.querySelector('.theme-icon-active use')
                    const btnToActive = document.querySelector(\`[data-bs-theme-value="\${theme}"]\`)
                    const svgOfActiveBtn = btnToActive.querySelector('.mode-switch use').getAttribute('href')

                    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
                        element.classList.remove('active')
                    })

                    btnToActive.classList.add('active')
                    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
                }

                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                    if (storedTheme !== 'light' || storedTheme !== 'dark') {
                        setTheme(getPreferredTheme())
                    }
                })

                showActiveTheme(getPreferredTheme())

                document.querySelectorAll('[data-bs-theme-value]')
                    .forEach(toggle => {
                        toggle.addEventListener('click', () => {
                            const theme = toggle.getAttribute('data-bs-theme-value')
                            localStorage.setItem('theme', theme)
                            setTheme(theme)
                            showActiveTheme(theme)
                        })
                    })

                }
            })
          `}
        </Script>

        {/* Favicon */}
        <link rel="shortcut icon" href="/assets/images/favicon.ico" />

        {/* Google Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap" />

        {/* Plugins CSS */}
        <link rel="stylesheet" type="text/css" href="/assets/vendor/font-awesome/css/all.min.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/apexcharts/css/apexcharts.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/overlay-scrollbar/css/overlayscrollbars.min.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/tiny-slider/tiny-slider.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/glightbox/css/glightbox.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/choices/css/choices.min.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/aos/aos.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/plyr/plyr.css" />

        {/* Theme CSS */}
        <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />

      {/* </head> */}

      {/* <body> */}

      {/* **************** MAIN CONTENT START **************** */}
      <main>
        
        {/* include('admin/_side_bar.html.twig') */}

        {/* Page content START */}
        <div className="page-content">

            {/* include('admin/_navbar.html.twig') */}

            {/* Page main content START */}
            {/* block mainPageContent */}
            <div className="page-content-wrapper border">
                {/* 
                {% for msg in app.flashes('info') %}
                    <div className="col-12">
                        <div className="alert alert-info text-center">
                            {msg}
                        </div>
                    </div>
                {% endfor %}
                */}
                
                {/* Title */}
                <div className="row">
                    <div className="col-12 mb-3 d-sm-flex justify-content-between align-items-center">
                        <h1 className="h3 mb-2 mb-sm-0">{props.title || 'Dashboard'}</h1>
                        {/* block actionBtn */}
                    </div>
                </div>

                {/* block mainContent */}
                    {props.children}
                {/* endblock */}

            </div>
            {/* Page main content END */}
            {/* endblock */}
        </div>
        {/* Page content END */}

        <div className="modal fade" id="editModal" tabIndex={-1} aria-labelledby="viewReviewLabel" aria-hidden="true"></div>

      </main>
      {/* **************** MAIN CONTENT END **************** */}

      {/* Back to top */}
      <div className="back-top"><i className="bi bi-arrow-up-short position-absolute top-50 start-50 translate-middle"></i></div>

      <Script id="base-url-script">
        {`var baseUrl = "http://localhost:8000";`}
      </Script>
      {/* Vendors */}
      <Script src="/assets/vendor/jquery/jquery-3.6.4.min.js"></Script>

      {/* Bootstrap JS */}
      <Script src="/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></Script>

      {/* Vendors */}
      <Script src="/assets/vendor/tiny-slider/tiny-slider.js"></Script>
      <Script src="/assets/vendor/glightbox/js/glightbox.js"></Script>
      <Script src="/assets/vendor/purecounterjs/dist/purecounter_vanilla.js"></Script>
      <Script src="/assets/vendor/apexcharts/js/apexcharts.min.js"></Script>
      <Script src="/assets/vendor/choices/js/choices.min.js"></Script>
      <Script src="/assets/vendor/aos/aos.js"></Script>

      <Script id="custom-scripts">
        {`
            // Custom scripts placeholder
            // $('.pagination-container nav').addClass('d-flex justify-content-center mb-0')
            // ...
        `}
      </Script>

      {/* Template Functions */}
      <Script src="/assets/js/functions.js"></Script>

      {/* </body> */}

      {/* </html> */}
    </>
  );
}
