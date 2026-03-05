import React, { useState } from 'react';

interface SocialLink {
  icon: string;
  link: string;
  class: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Mock social settings - normally fetched from backend
  const socialsSettings: SocialLink[] = [
    { icon: 'fab fa-fw fa-facebook-f', link: '#', class: 'text-facebook' },
    { icon: 'fab fa-fw fa-instagram', link: '#', class: 'text-instagram' },
    { icon: 'fab fa-fw fa-twitter', link: '#', class: 'text-twitter' },
    { icon: 'fab fa-fw fa-linkedin-in', link: '#', class: 'text-linkedin' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSuccessMessage('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
    
    // Hide message after 3 seconds
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <>
      {/* =======================
      Page Banner START */}
      <section className="pt-5 pb-0" style={{ backgroundImage: "url('/assets/images/element/map.svg')", backgroundPosition: 'center left', backgroundSize: 'cover' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-6 text-center mx-auto">
              {/* Title */}
              <h6 className="text-primary">Contact us</h6>
              <h1 className="mb-4">We're here to help!</h1>
            </div>
          </div>

          {/* Contact info box */}
          <div className="row g-4 g-md-5 mt-0 mt-lg-3">
            {/* Box item */}
            <div className="col-lg-4 mt-lg-0">
              <div className="card card-body bg-primary shadow py-5 text-center h-100">
                {/* Title */}
                <h5 className="text-white mb-3">Customer Support</h5>
                <ul className="list-inline mb-0">
                  {/* Address */}
                  <li className="list-item mb-3">
                    <a href="#" className="text-white"> <i className="fas fa-fw fa-map-marker-alt me-2 mt-1"></i>Douala-Akwa / Carrefour Equinox TV, face Beneficial Assurance</a>
                  </li>
                  {/* Phone number */}
                  <li className="list-item mb-3">
                    <a href="#" className="text-white"> <i className="fas fa-fw fa-phone-alt me-2"></i>(+237) 698809093 </a>
                  </li>
                  {/* Email id */}
                  <li className="list-item mb-0">
                    <a href="#" className="text-white"> <i className="far fa-fw fa-envelope me-2"></i>dodave-academycontact@gmail.com </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Box item */}
            <div className="col-lg-4 mt-lg-0">
              <div className="card card-body shadow py-5 text-center h-100">
                {/* Title */}
                <h5 className="mb-3">Contact Address</h5>
                <ul className="list-inline mb-0">
                  {/* Address */}
                  <li className="list-item mb-3 h6 fw-light">
                    <a href="#"> <i className="fas fa-fw fa-map-marker-alt me-2 mt-1"></i>Douala-Akwa / Carrefour Equinox TV, face Beneficial Assurance</a>
                  </li>
                  {/* Phone number */}
                  <li className="list-item mb-3 h6 fw-light">
                    <a href="#"> <i className="fas fa-fw fa-phone-alt me-2"></i>+237 678507398 </a>
                  </li>
                  {/* Email id */}
                  <li className="list-item mb-0 h6 fw-light">
                    <a href="#"> <i className="far fa-fw fa-envelope me-2"></i>dodave-academycontact@gmail.com </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Box item */}
            <div className="col-lg-4 mt-lg-0">
              <div className="card card-body shadow py-5 text-center h-100">
                {/* Title */}
                <h5 className="mb-3">Main Office</h5>
                <ul className="list-inline mb-0">
                  {/* Address */}
                  <li className="list-item mb-3 h6 fw-light">
                    <a href="#"> <i className="fas fa-fw fa-map-marker-alt me-2 mt-1"></i>Douala-Akwa / Carrefour Equinox TV, face Beneficial Assurance </a>
                  </li>
                  {/* Phone number */}
                  <li className="list-item mb-3 h6 fw-light">
                    <a href="#"> <i className="fas fa-fw fa-phone-alt me-2"></i>+237 698809093 </a>
                  </li>
                  {/* Email id */}
                  <li className="list-item mb-0 h6 fw-light">
                    <a href="#"> <i className="far fa-fw fa-envelope me-2"></i>dodave-academycontact@gmail.com </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =======================
      Page Banner END */}

      {/* =======================
      Image and contact form START */}
      <section>
        <div className="container">
          <div className="row g-4 g-lg-0 align-items-center">
            {successMessage && (
              <div className="col-12">
                <div className="alert alert-success text-center">
                  {successMessage}
                </div>
              </div>
            )}

            <div className="col-md-6 align-items-center text-center">
              {/* Image */}
              <img src="/assets/images/element/contact.svg" className="h-400px" alt="" />

              {/* Social media button */}
              {socialsSettings && socialsSettings.length > 0 && (
                <div className="d-sm-flex align-items-center justify-content-center mt-2 mt-sm-4">
                  <h5 className="mb-0">Follow us:</h5>
                  <ul className="list-inline mb-0 ms-sm-2">
                    {socialsSettings.map((item, index) => (
                      <li key={index} className="list-inline-item">
                        <a target="_blank" rel="noreferrer" className={`btn btn-white btn-sm shadow px-2 ${item.class}`} href={item.link}>
                          <i className={item.icon}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Contact form START */}
            <div className="col-md-6">
              {/* Title */}
              <h2 className="mt-4 mt-md-0">Let's talk</h2>
              <p>To request a quote or want to meet up for coffee, contact us directly or fill out the form and we will get back to you promptly.</p>

              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-4 bg-light-input">
                  <label htmlFor="name" className="form-label">Your name *</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Email */}
                <div className="mb-4 bg-light-input">
                  <label htmlFor="email" className="form-label">Email address *</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Message */}
                <div className="mb-4 bg-light-input">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                {/* Button */}
                <div className="d-grid">
                  <button className="btn btn-lg btn-primary mb-0" type="submit">Send Message</button>
                </div>
              </form>
            </div>
            {/* Contact form END */}
          </div>
        </div>
      </section>
      {/* =======================
      Image and contact form END */}
    </>
  );
}
