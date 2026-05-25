(function () {
    "use strict";

    // Spinner
    setTimeout(function () {
        var spinner = document.getElementById('spinner');
        if (spinner) {
            spinner.classList.remove('show');
        }
    }, 1);

    // Wow.js
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    // Back to top button
    window.addEventListener('scroll', function () {
        var backToTop = document.querySelector('.back-to-top');
        if (!backToTop) return;
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
            setTimeout(function () {
                if (window.scrollY <= 300) {
                    backToTop.style.display = 'none';
                }
            }, 300);
        }
    });

    document.addEventListener('click', function (e) {
        var target = e.target.closest('.back-to-top');
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Fade helpers
    function fadeIn(el, duration) {
        if (!el) return;
        el.style.opacity = '0';
        el.style.display = 'block';
        var start = performance.now();
        function step(now) {
            var progress = Math.min((now - start) / duration, 1);
            el.style.opacity = String(progress);
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    function fadeOut(el, duration) {
        if (!el) return;
        var start = performance.now();
        function step(now) {
            var progress = Math.min((now - start) / duration, 1);
            el.style.opacity = String(1 - progress);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.style.display = 'none';
            }
        }
        requestAnimationFrame(step);
    }

    // Carousel init using tiny-slider (vanilla JS alternative to OwlCarousel)
    function initCarousels() {
        if (typeof tns === 'undefined') return;

        var teamCarousel = document.querySelector('.team-carousel');
        if (teamCarousel) {
            tns({
                container: '.team-carousel',
                autoplay: true,
                autoplayTimeout: 3000,
                speed: 1000,
                center: false,
                controls: true,
                nav: false,
                loop: true,
                gutter: 50,
                controlsText: [
                    '<i class="bi bi-arrow-left"></i>',
                    '<i class="bi bi-arrow-right"></i>'
                ],
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 },
                    992: { items: 3 }
                }
            });
        }

        var testimonialCarousel = document.querySelector('.testimonial-carousel');
        if (testimonialCarousel) {
            tns({
                container: '.testimonial-carousel',
                autoplay: true,
                autoplayTimeout: 4000,
                speed: 1500,
                center: true,
                nav: true,
                loop: true,
                gutter: 0,
                controls: true,
                controlsText: false,
                responsive: {
                    0: { items: 1 },
                    576: { items: 1 },
                    768: { items: 2 },
                    992: { items: 3 }
                }
            });
        }
    }

    // Wait for DOM and libraries
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousels);
    } else {
        initCarousels();
    }

    // Fact Counter
    function animateCounters() {
        document.querySelectorAll('.counter-value').forEach(function (el) {
            var target = parseInt(el.textContent, 10) || 0;
            var current = 0;
            var duration = 2000;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var eased = progress * progress; // easeInQuad approximation
                el.textContent = String(Math.ceil(eased * target));
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = String(target);
                }
            }

            requestAnimationFrame(step);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', animateCounters);
    } else {
        animateCounters();
    }

})();
