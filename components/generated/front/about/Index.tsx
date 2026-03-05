import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  return (
    <>
      {/* =======================
      Page Banner START */}
      <section>
        <div className="container">
          <div className="row g-4">
            {/* Title and SVG START */}
            <div className="col-10 text-center mx-auto position-relative">
              {/* SVG decoration */}
              <figure className="position-absolute top-100 start-50 translate-middle mt-5 ms-n9 pt-5 d-none d-lg-block">
                <svg>
                  <path className="fill-success" d="m181.6 6.7c-0.1 0-0.2-0.1-0.3 0-2.5-0.3-4.9-1-7.3-1.4-2.7-0.4-5.5-0.7-8.2-0.8-1.4-0.1-2.8-0.1-4.1-0.1-0.5 0-0.9-0.1-1.4-0.2-0.9-0.3-1.9-0.1-2.8-0.1-5.4 0.2-10.8 0.6-16.1 1.4-2.7 0.3-5.3 0.8-7.9 1.3-0.6 0.1-1.1 0.3-1.8 0.3-0.4 0-0.7-0.1-1.1-0.1-1.5 0-3 0.7-4.3 1.2-3 1-6 2.4-8.8 3.9-2.1 1.1-4 2.4-5.9 3.9-1 0.7-1.8 1.5-2.7 2.2-0.5 0.4-1.1 0.5-1.5 0.9s-0.7 0.8-1.1 1.2c-1 1-1.9 2-2.9 2.9-0.4 0.3-0.8 0.5-1.2 0.5-1.3-0.1-2.7-0.4-3.9-0.6-0.7-0.1-1.2 0-1.8 0-3.1 0-6.4-0.1-9.5 0.4-1.7 0.3-3.4 0.5-5.1 0.7-5.3 0.7-10.7 1.4-15.8 3.1-4.6 1.6-8.9 3.8-13.1 6.3-2.1 1.2-4.2 2.5-6.2 3.9-0.9 0.6-1.7 0.9-2.6 1.2s-1.7 1-2.5 1.6c-1.5 1.1-3 2.1-4.6 3.2-1.2 0.9-2.7 1.7-3.9 2.7-1 0.8-2.2 1.5-3.2 2.2-1.1 0.7-2.2 1.5-3.3 2.3-0.8 0.5-1.7 0.9-2.5 1.5-0.9 0.8-1.9 1.5-2.9 2.2 0.1-0.6 0.3-1.2 0.4-1.9 0.3-1.7 0.2-3.6 0-5.3-0.1-0.9-0.3-1.7-0.8-2.4s-1.5-1.1-2.3-0.8c-0.2 0-0.3 0.1-0.4 0.3s-0.1 0.4-0.1 0.6c0.3 3.6 0.2 7.2-0.7 10.7-0.5 2.2-1.5 4.5-2.7 6.4-0.6 0.9-1.4 1.7-2 2.6s-1.5 1.6-2.3 2.3c-0.2 0.2-0.5 0.4-0.6 0.7s0 0.7 0.1 1.1c0.2 0.8 0.6 1.6 1.3 1.8 0.5 0.1 0.9-0.1 1.3-0.3 0.9-0.4 1.8-0.8 2.7-1.2 0.4-0.2 0.7-0.3 1.1-0.6 1.8-1 3.8-1.7 5.8-2.3 4.3-1.1 9-1.1 13.3 0.1 0.2 0.1 0.4 0.1 0.6 0.1 0.7-0.1 0.9-1 0.6-1.6-0.4-0.6-1-0.9-1.7-1.2-2.5-1.1-4.9-2.1-7.5-2.7-0.6-0.2-1.3-0.3-2-0.4-0.3-0.1-0.5 0-0.8-0.1s-0.9 0-1.1-0.1-0.3 0-0.3-0.2c0-0.4 0.7-0.7 10.8-0.8 0.5-0.3 1-0.7 1.5-1l5.4-3.6c0.4-0.2 0.6-0.6 1-0.9 1.2-0.9 2.8-1.3 4-2.2 0.4-0.3 0.9-0.6 1.3-0.9l2.7-1.8c1-0.6 2.2-1.2 3.2-1.8 0.9-0.5 1.9-0.8 2.7-1.6 0.9-0.8 2.2-1.4 3.2-2 1.2-0.7 2.3-1.4 3.5-2.1 4.1-2.5 8.2-4.9 12.7-6.6 5.2-1.9 10.6-3.4 16.2-4 5.4-0.6 10.8-0.3 16.2-0.5h0.5c1.4-0.1 2.3-0.1 1.7 1.7-1.4 4.5 1.3 7.5 4.3 10 3.4 2.9 7 5.7 11.3 7.1 4.8 1.6 9.6 3.8 14.9 2.7 3-0.6 6.5-4 6.8-6.4 0.2-1.7 0.1-3.3-0.3-4.9-0.4-1.4-1-3-2.2-3.9-0.9-0.6-1.6-1.6-2.4-2.4-0.9-0.8-1.9-1.7-2.9-2.3-2.1-1.4-4.2-2.6-6.5-3.5-3.2-1.3-6.6-2.2-10-3-0.8-0.2-1.6-0.4-2.5-0.5-0.2 0-1.3-0.1-1.3-0.3-0.1-0.2 0.3-0.4 0.5-0.6 0.9-0." />
                </svg>
              </figure>
              {/* SVG decoration */}
              <figure className="position-absolute top-0 start-0 ms-n9">
                <svg width="22px" height="22px" viewBox="0 0 22 22">
                  <polygon className="fill-orange" points="22,8.3 13.7,8.3 13.7,0 8.3,0 8.3,8.3 0,8.3 0,13.7 8.3,13.7 8.3,22 13.7,22 13.7,13.7 22,13.7 "/>
                </svg>
              </figure>
              {/* SVG decoration */}
              <figure className="position-absolute top-100 start-100 translate-middle ms-5 d-none d-md-block">
                <svg width="21.5px" height="21.5px" viewBox="0 0 21.5 21.5">
                  <polygon className="fill-danger" points="21.5,14.3 14.4,9.9 18.9,2.8 14.3,0 9.9,7.1 2.8,2.6 0,7.2 7.1,11.6 2.6,18.7 7.2,21.5 11.6,14.4 18.7,18.9 "/>
                </svg>
              </figure>
              {/* SVG decoration */}
              <figure className="position-absolute top-0 start-100 translate-middle">
                <svg width="27px" height="27px">
                  <path className="fill-orange" d="M13.122,5.946 L17.679,-0.001 L17.404,7.528 L24.661,5.946 L19.683,11.533 L26.244,15.056 L18.891,16.089 L21.686,23.068 L15.400,19.062 L13.122,26.232 L10.843,19.062 L4.557,23.068 L7.352,16.089 L-0.000,15.056 L6.561,11.533 L1.582,5.946 L8.839,7.528 L8.565,-0.001 L13.122,5.946 Z"/>
                </svg>
              </figure>

              {/* Title */}
              <h1 className="position-relative fs-2">{t('ABOUTUS_KEY')}</h1>
            </div>
            {/* Title and SVG END */}
          </div>

          {/* Images START */}
          <div className="row g-4 mt-0 mt-lg-5">
            {/* Left image */}
            <div className="col-6 col-md-4">
              <div className="row g-4">
                {/* Image */}
                <div className="col-10 col-lg-6">
                  <img className="rounded-4" src="/assets/images/about/05.jpg" alt="" />
                </div>
                {/* Image */}
                <div className="col-12">
                  <img className="rounded-4" src="/assets/images/about/03.jpg" alt="" />
                </div>
              </div>
            </div>

            {/* Center image */}
            <div className="col-6 col-md-4 position-relative">
              {/* SVG decoration */}
              <figure className="position-absolute bottom-0 start-0 ms-n5">
                <svg width="129px" height="133px">
                  <path className="fill-blue" d="M127.581,25.993 C122.659,31.935 113.441,24.283 118.356,18.351 C123.278,12.408 132.496,20.060 127.581,25.993 ZM115.247,49.292 C106.977,59.275 91.492,46.420 99.748,36.454 C108.018,26.470 123.503,39.325 115.247,49.292 ZM86.935,2.378 C91.464,-3.089 99.944,3.951 95.423,9.409 C90.894,14.876 82.414,7.836 86.935,2.378 ZM93.501,43.010 C84.246,54.182 66.918,39.796 76.157,28.643 C85.411,17.471 102.740,31.856 93.501,43.010 ZM57.726,6.672 C63.633,-0.460 74.694,8.723 68.796,15.842 C62.889,22.973 51.828,13.791 57.726,6.672 ZM65.132,42.254 C65.414,45.250 64.407,48.520 62.488,50.836 C60.459,53.285 57.635,54.609 54.547,55.032 C51.448,55.456 48.387,54.215 45.962,52.383 C43.626,50.618 42.031,47.307 41.761,44.441 C41.479,41.444 42.486,38.175 44.406,35.858 C46.434,33.410 49.258,32.085 52.346,31.662 C55.446,31.238 58.507,32.479 60.931,34.312 C63.267,36.076 64.862,39.387 65.132,42.254 ZM48.502,101.257 C42.496,108.507 31.251,99.172 37.247,91.934 C43.252,84.684 54.497,94.019 48.502,101.257 ZM23.966,17.251 C29.774,10.238 40.651,19.267 34.852,26.269 C29.043,33.281 18.167,24.251 23.966,17.251 ZM9.378,26.952 C15.088,20.059 25.780,28.935 20.079,35.817 C14.369,42.711 3.677,33.835 9.378,26.952 ZM10.074,49.315 C5.742,54.545 -2.369,47.811 1.955,42.590 C6.287,37.361 14.399,44.094 10.074,49.315 ZM10.889,68.408 C13.679,70.517 13.903,74.910 11.746,77.514 C9.434,80.305 5.439,80.481 2.640,78.366 C-0.150,76.258 -0.375,71.865 1.783,69.260 C4.095,66.469 8.090,66.293 10.889,68.408 ZM9.881,114.513 C5.450,119.861 -2.845,112.974 1.578,107.635 C6.008,102.287 14.304,109.173 9.881,114.513 ZM12.758,94.899 C14.381,91.994 16.764,89.898 20.208,89.575 C22.532,89.358 25.068,90.140 26.866,91.630 C28.766,93.203 29.795,95.394 30.124,97.789 C30.589,101.171 28.744,104.038 26.279,106.100 C26.173,106.189 26.066,106.278 25.960,106.367 C24.381,107.689 21.309,108.287 19.326,107.873 C17.757,107.545 16.312,106.882 15.033,105.915 C13.453,104.722 12.479,102.811 12.056,100.935 C12.296,100.106 13.173,99.608 14.001,99.851 C14.830,100.090 15.328,100.967 15.088,101.795 C15.424,103.291 16.195,104.814 17.457,105.748 C18.730,106.691 20.697,107.132 23.393,105.378 C24.782,104.473 25.807,102.871 25.438,100.222 C25.176,98.312 24.364,96.564 22.846,95.312 C20.329,93.237 17.067,93.220 14.322,94.757 C13.568,95.178 12.618,94.908 12.196,94.155 C11.774,93.401 12.045,92.451 12.798,92.030 C16.596,89.904 21.056,89.967 24.464,92.774 C26.784,94.688 28.026,97.359 28.427,100.279 C29.079,104.970 27.279,107.828 25.042,109.284 C21.492,111.593 18.239,111.082 15.656,109.171 C13.670,107.701 12.339,105.313 11.696,102.825 C11.396,102.756 11.102,102.637 10.824,102.470 C10.082,102.025 9.842,101.066 10.287,100.325 C10.732,99.584 11.692,99.344 12.433,99.789 C12.894,100.065 13.493,99.996 13.886,99.605 C14.280,99.213 14.348,98.614 14.072,98.153 C13.627,97.412 13.867,96.453 14.608,96.008 C15.349,95.563 16.308,95.803 16.753,96.544 C17.348,97.536 17.202,98.826 16.353,99.671 C16.273,99.750 16.188,99.823 16.101,99.890 C16.541,101.594 17.414,103.189 18.665,104.115 C19.916,105.041 21.849,105.474 24.502,103.748 C25.869,102.858 26.877,101.282 26.514,98.675 C26.256,96.796 25.457,95.076 23.963,93.845 C21.487,91.803 18.277,91.787 15.576,93.299 C15.567,93.304 15.558,93.309 15.549,93.314 L12.758,94.899 Z"/>
                </svg>
              </figure>
              {/* Image */}
              <img className="rounded-4" src="/assets/images/about/09.jpg" alt="" />
            </div>

            {/* Right image */}
            <div className="col-md-4">
              <div className="row g-4">
                {/* Content */}
                <div className="col-sm-6 col-md-12">
                  <div className="bg-grad rounded-4 p-5 text-start">
                    <span className="text-white">{t('OUR_GOAL_KEY')}:</span>
                    <h3 className="text-white">“{t('OUR_GOAL_TEXT_KEY')}”</h3>
                  </div>
                </div>
                {/* Image */}
                <div className="col-sm-6 col-md-12 col-lg-6">
                  <img className="rounded-4" src="/assets/images/about/10.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
          {/* Images END */}
        </div>
      </section>
      {/* =======================
      Page Banner END */}

      {/* =======================
      About founder START */}
      <section className="pt-0 pt-md-5">
        <div className="container">
          {/* Title */}
          <div className="row mb-4">
            <div className="col-lg-8">
              <h2>{t('ABOUT_US_TITLE_KEY')}</h2>
              <p className="mb-0">
                {t('ABOUT_US_DESCRIPTION_KEY')}
              </p>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-5 position-relative">
              {/* SVG decoration */}
              <figure className="position-absolute top-0 start-0 d-inline-block mt-n3">
                <svg width="180" height="188" viewBox="0 0 379 395" xmlns="http://www.w3.org/2000/svg">
                  {/* SVG paths omitted for brevity, keeping the image */}
                  <path className="fill-dark" d="m194.01 213.69c0.16-5.82-0.7-11.77-1.4-17.55-0.64-5.35-0.76-11.29-2.82-16.27-1.96-4.73-8.61-4.2-9.04 1.22-0.43 5.35 1.23 11.08 2.27 16.34 1.14 5.75 2.15 11.66 4.1 17.18 1.3 3.67 6.78 3.18 6.89-0.92z"/>
                  {/* ... other paths ... */}
                </svg>
              </figure>

              {/* Image */}
              <img src="/assets/images/about/06.jpg" className="rounded" alt="" />
            </div>

            <div className="col-lg-7 mt-4 mt-lg-0">
              {/* Title */}
              <h4 className="mb-3">What we do for students</h4>

              {/* Content */}
              <p>We provide high-quality courses created by industry experts.</p>
              <p>Our platform is designed to help you learn at your own pace and achieve your goals.</p>

              {/* Info */}
              <ul className="list-group list-group-borderless mt-4">
                <li className="list-group-item d-flex">
                  <i className="bi bi-patch-check-fill text-success me-2"></i>Real-time Setup
                </li>
                <li className="list-group-item d-flex">
                  <i className="bi bi-patch-check-fill text-success me-2"></i>Professional Support
                </li>
                <li className="list-group-item d-flex">
                  <i className="bi bi-patch-check-fill text-success me-2"></i>Perfect for Beginners
                </li>
                <li className="list-group-item d-flex">
                  <i className="bi bi-patch-check-fill text-success me-2"></i>Fast Implementation
                </li>
              </ul>

              {/* Progress bar START */}
              <div className="row mt-3 g-4">
                {/* Progress item */}
                <div className="col-md-6">
                  <div className="overflow-hidden">
                    <h6>Enterprise Customer</h6>
                    <div className="progress progress-sm bg-primary bg-opacity-10">
                      <div className="progress-bar bg-primary aos" role="progressbar" data-aos="slide-right" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-in-out" style={{ width: '85%' }} aria-valuenow={85} aria-valuemin={0} aria-valuemax={100}>
                        <span className="progress-percent-simple ms-auto h6 fw-light">85%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress item */}
                <div className="col-md-6">
                  <div className="overflow-hidden">
                    <h6>Accurate Course</h6>
                    <div className="progress progress-sm bg-primary bg-opacity-10">
                      <div className="progress-bar bg-primary aos" role="progressbar" data-aos="slide-right" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-in-out" style={{ width: '90%' }} aria-valuenow={90} aria-valuemin={0} aria-valuemax={100}>
                        <span className="progress-percent-simple ms-auto h6 fw-light">90%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress item */}
                <div className="col-md-6">
                  <div className="overflow-hidden">
                    <h6>Languages</h6>
                    <div className="progress progress-sm bg-primary bg-opacity-10">
                      <div className="progress-bar bg-primary aos" role="progressbar" data-aos="slide-right" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-in-out" style={{ width: '75%' }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                        <span className="progress-percent-simple ms-auto h6 fw-light">75%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress item */}
                <div className="col-md-6">
                  <div className="overflow-hidden">
                    <h6>Instructors</h6>
                    <div className="progress progress-sm bg-primary bg-opacity-10">
                      <div className="progress-bar bg-primary aos" role="progressbar" data-aos="slide-right" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-in-out" style={{ width: '95%' }} aria-valuenow={95} aria-valuemin={0} aria-valuemax={100}>
                        <span className="progress-percent-simple ms-auto h6 fw-light">95%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Progress bar END */}
            </div>
          </div>
        </div>
      </section>
      {/* =======================
      About founder END */}

      {/* =======================
      Client START */}
      <section className="bg-light">
        <div className="container">
          <div className="row d-flex justify-content-center">
            {/* Logo item */}
            <div className="col-6 col-sm-4 col-lg-2">
              <div className="p-4 grayscale text-center">
                <img src="/assets/images/client/microsoft.svg" alt="" />
              </div>
            </div>
            {/* Logo item */}
            <div className="col-6 col-sm-4 col-lg-2">
              <div className="p-4 grayscale text-center">
                <img src="/assets/images/client/linkedin.svg" alt="" />
              </div>
            </div>
            {/* Logo item */}
            <div className="col-6 col-sm-4 col-lg-2">
              <div className="p-4 grayscale text-center">
                <img src="/assets/images/client/netflix.svg" alt="" />
              </div>
            </div>
            {/* Logo item */}
            <div className="col-6 col-sm-4 col-lg-2">
              <div className="p-4 grayscale text-center">
                <img src="/assets/images/client/coca-cola.svg" alt="" />
              </div>
            </div>
            {/* Logo item */}
            <div className="col-6 col-sm-4 col-lg-2">
              <div className="p-4 grayscale text-center">
                <img src="/assets/images/client/envato.svg" alt="" />
              </div>
            </div>
            {/* Logo item */}
            <div className="col-6 col-sm-4 col-lg-2">
              <div className="p-4 grayscale text-center">
                <img src="/assets/images/client/android.svg" alt="" />
              </div>
            </div>
            {/* Logo item */}
            <div className="col-6 col-sm-4 col-lg-2">
              <div className="p-4 grayscale text-center">
                <img src="/assets/images/client/coca-cola.svg" alt="" />
              </div>
            </div>
            {/* Logo item */}
            <div className="col-6 col-sm-4 col-lg-2">
              <div className="p-4 grayscale text-center">
                <img src="/assets/images/client/shippable.svg" alt="" />
              </div>
            </div>
            {/* Logo item */}
            <div className="col-6 col-sm-4 col-lg-2">
              <div className="p-4 grayscale text-center">
                <img src="/assets/images/client/algolia.svg" alt="" />
              </div>
            </div>
            {/* Logo item */}
            <div className="col-6 col-sm-4 col-lg-2">
              <div className="p-4 grayscale text-center">
                <img src="/assets/images/client/importio.svg" alt="" />
              </div>
            </div>
            {/* Logo item */}
            <div className="col-6 col-sm-4 col-lg-2">
              <div className="p-4 grayscale text-center">
                <img src="/assets/images/client/yamaha.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =======================
      Client END */}

      {/* =======================
      Award and Team START */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              {/* Title */}
              <h2>Awards'N Stuff</h2>
              {/* Content */}
              <ul className="list-group list-group-borderless mt-4">
                {/* Award item */}
                <li className="list-group-item d-flex align-items-center px-0">
                  <h6 className="mb-0">2015</h6>
                  <span className="fs-6 ms-3">Heroes for Children award</span>
                </li>
                {/* Award item */}
                <li className="list-group-item d-flex align-items-center px-0">
                  <h6 className="mb-0">2016</h6>
                  <span className="fs-6 ms-3">Education Agency of the Year</span>
                </li>
                {/* Award item */}
                <li className="list-group-item d-flex align-items-center px-0">
                  <h6 className="mb-0">2017</h6>
                  <span className="fs-6 ms-3">National Teacher of the Year</span>
                </li>
                {/* Award item */}
                <li className="list-group-item d-flex align-items-center px-0">
                  <h6 className="mb-0">2018</h6>
                  <span className="fs-6 ms-3">Best education agency 2018</span>
                </li>
                {/* Award item */}
                <li className="list-group-item d-flex align-items-center px-0">
                  <h6 className="mb-0">2019</h6>
                  <span className="fs-6 ms-3">Teacher of the nation (2nd place)</span>
                </li>
                {/* Award item */}
                <li className="list-group-item d-flex align-items-center px-0">
                  <h6 className="mb-0">2020</h6>
                  <span className="fs-6 ms-3">Best Independent Education Agency</span>
                </li>
              </ul>
            </div>

            {/* Our team START */}
            <div className="col-md-8">
              {/* Title and button */}
              <div className="d-sm-flex justify-content-sm-between">
                <h2 className="mb-0">Our Team</h2>
                <Link href="/register?type=trainer" className="btn btn-light mt-2">Join Our Team</Link>
              </div>

              {/* Slider START - Converted to Grid */}
              <div className="row mt-2 mt-sm-5 g-4">
                {/* Avatar item */}
                <div className="col-6 col-md-4 text-center">
                  {/* Avatar */}
                  <div className="avatar avatar-xxl mb-3">
                    <img className="avatar-img rounded-circle" src="/assets/images/avatar/01.jpg" alt="avatar" />
                  </div>
                  {/* Info */}
                  <h6 className="mb-0"><a href="#">Carolyn Ortiz</a></h6>
                  <p className="mb-0 small">Designer</p>
                  {/* Rating */}
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning"></i></li>
                  </ul>
                </div>

                {/* Avatar item */}
                <div className="col-6 col-md-4 text-center">
                  {/* Avatar */}
                  <div className="avatar avatar-xxl mb-3">
                    <img className="avatar-img rounded-circle" src="/assets/images/avatar/02.jpg" alt="avatar" />
                  </div>
                  {/* Info */}
                  <h6 className="mb-0"><a href="#">Dennis Barrett</a></h6>
                  <p className="mb-0 small">IT professor</p>
                  {/* Rating */}
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning"></i></li>
                  </ul>
                </div>

                {/* Avatar item */}
                <div className="col-6 col-md-4 text-center">
                  {/* Avatar */}
                  <div className="avatar avatar-xxl mb-3">
                    <img className="avatar-img rounded-circle" src="/assets/images/avatar/09.jpg" alt="avatar" />
                  </div>
                  {/* Info */}
                  <h6 className="mb-0"><a href="#">Frances Guerrero</a></h6>
                  <p className="mb-0 small">Developer</p>
                  {/* Rating */}
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                  </ul>
                </div>

                {/* Avatar item */}
                <div className="col-6 col-md-4 text-center">
                  {/* Avatar */}
                  <div className="avatar avatar-xxl mb-3">
                    <img className="avatar-img rounded-circle" src="/assets/images/avatar/04.jpg" alt="avatar" />
                  </div>
                  {/* Info */}
                  <h6 className="mb-0"><a href="#">Larry Lawson</a></h6>
                  <p className="mb-0 small">Designer</p>
                  {/* Rating */}
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning"></i></li>
                  </ul>
                </div>

                {/* Avatar item */}
                <div className="col-6 col-md-4 text-center">
                  {/* Avatar */}
                  <div className="avatar avatar-xxl mb-3">
                    <img className="avatar-img rounded-circle" src="/assets/images/avatar/10.jpg" alt="avatar" />
                  </div>
                  {/* Info */}
                  <h6 className="mb-0"><a href="#">Louis Crawford</a></h6>
                  <p className="mb-0 small">Medical Professor</p>
                  {/* Rating */}
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning"></i></li>
                  </ul>
                </div>
              </div>
              {/* Slider END */}
            </div>
            {/* Our team END */}
          </div>
        </div>
      </section>
      {/* =======================
      Award and Team END */}
    </>
  );
}
