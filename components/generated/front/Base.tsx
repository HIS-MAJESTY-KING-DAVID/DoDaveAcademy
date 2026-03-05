import React from 'react';
import Link from 'next/link';
import Script from 'next/script';

export default function Base(props: any) {
  return (
    <>
      {/* <!DOCTYPE html> */}
      {/* <html lang="en"> */}

      {/* <head> */}
        {/* {% set siteSettings = app.session.get('siteSettings') %} */}
        {/* {% set socialsSettings = app.session.get('socialsSettings') %} */}
        <title>{props.siteName || "DoDaveAcademy.com"}
            {/* block title */}
        </title>

        {/* Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="author" content="Webestica.com" />
        {/* <meta name="current-user-id" content="{app.user ? app.user.id : ''}" /> */}


        <meta name="description" content="DoDave Academy - The Best E-learning platform" />

        {/* Webpack Encore */}
        {/* {encore_entry_link_tags('app')} */}
        {/* block stylesheets */}

        {/* Dark mode */}
        <Script id="theme-script-front" strategy="beforeInteractive">
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
                if (el != 'undefined' && el != null) {
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

                document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
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
        <link rel="stylesheet" type="text/css" href="/assets/vendor/aos/aos.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/tiny-slider/tiny-slider.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/glightbox/css/glightbox.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/choices/css/choices.min.css" />

        {/* Theme CSS */}
        <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />
        
        {/* Custom Styles */}
        <style dangerouslySetInnerHTML={{__html: `
			.stepwizard-step p {
				margin-top: 10px;
			}
			.stepwizard-row {
				display: table-row;
			}
			.stepwizard {
				display: table;
				width: 50%;
				margin: 0 auto;

				position: relative;
			}
			.stepwizard-step button[disabled] {
				opacity: 1 !important;
				filter: alpha(opacity=100) !important;
			}
			.stepwizard-row:before {
				top: 14px;
				bottom: 0;
				position: absolute;
				content: " ";
				width: 100%;
				height: 1px;
				background-color: #ccc;
				z-index: 0;
			}
			.stepwizard-step {
				display: table-cell;
				text-align: center;
				position: relative;
			}
			.btn-circle {
				width: 30px;
				height: 30px;
				text-align: center;
				padding: 6px 0;
				font-size: 12px;
				line-height: 1.428571429;
				border-radius: 15px;
			}
			.masthead {
				height: 100vh;
				min-height: 500px;
				background-image: url('https://source.unsplash.com/BtbjCFUvBXs/1920x1080');
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
			}
        `}} />

      {/* </head> */}

      {/* <body> */}
        
        {/* include('front/_navbar.html.twig') */}
        
        {/* block body */}
        <main>
            {props.children}
        </main>
        {/* endblock */}

        {/* include('front/_footer.html.twig') */}

        {/* Back to top */}
        <div className="back-top"><i className="bi bi-arrow-up-short position-absolute top-50 start-50 translate-middle"></i></div>

        {/* Bootstrap JS */}
        <Script src="/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></Script>

        {/* Vendors */}
        <Script src="/assets/vendor/tiny-slider/tiny-slider.js"></Script>
        <Script src="/assets/vendor/glightbox/js/glightbox.js"></Script>
        <Script src="/assets/vendor/purecounterjs/dist/purecounter_vanilla.js"></Script>
        <Script src="/assets/vendor/aos/aos.js"></Script>
        <Script src="/assets/vendor/choices/js/choices.min.js"></Script>

        {/* Template Functions */}
        <Script src="/assets/js/functions.js"></Script>

      {/* </body> */}

      {/* </html> */}
    </>
  );
}
