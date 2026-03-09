import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Have questions? Get in touch with DoDave Academy. Our support team is here to assist you with your education journey.',
  openGraph: {
    title: 'Contact DoDave Academy',
    description: 'We are here to help. Reach out to our team for any inquiries or support.',
  },
};

export default function Contact() {
  return (
    <main>
       {/* Page Banner START */}
       <section className="pt-5 pb-0" style={{
           backgroundImage: 'url(/assets/images/element/map.svg)',
           backgroundPosition: 'center left',
           backgroundSize: 'cover'
       }}>
          <div className="container">
             <div className="row">
                <div className="col-lg-8 col-xl-6 text-center mx-auto">
                   {/* Title */}
                   <h6 className="text-primary">Contact us</h6>
                   <h1 className="mb-4">We&apos;re here to help!</h1>
                </div>
             </div>

             {/* Contact info box */}
             <div className="row g-4 g-md-5 mt-0 mt-lg-3">
                {/* Box item */}
                <div className="col-lg-4 mt-lg-0">
                   <div className="card card-body bg-primary shadow py-5 text-center h-100">
                      {/* Title */}
                      <h5 className="text-white mb-3">WhatsApp</h5>
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
                            <a href="#" className="text-white"> <i className="far fa-fw fa-envelope me-2"></i>contact@dodaveacademy.com </a>
                         </li>
                      </ul>
                   </div>
                </div>

                {/* Box item */}
                <div className="col-lg-4 mt-lg-0">
                   <div className="card card-body shadow py-5 text-center h-100">
                      {/* Title */}
                      <h5 className="mb-3">MTN</h5>
                      <ul className="list-inline mb-0">
                         {/* Phone number */}
                         <li className="list-item mb-3 h6 fw-light">
                            <a href="#"> <i className="fas fa-fw fa-phone-alt me-2"></i>+237 678507398 </a>
                         </li>
                      </ul>
                   </div>
                </div>

                {/* Box item */}
                <div className="col-lg-4 mt-lg-0">
                   <div className="card card-body shadow py-5 text-center h-100">
                      {/* Title */}
                      <h5 className="mb-3">Orange</h5>
                      <ul className="list-inline mb-0">
                         {/* Phone number */}
                         <li className="list-item mb-3 h6 fw-light">
                            <a href="#"> <i className="fas fa-fw fa-phone-alt me-2"></i>+237 698809093 </a>
                         </li>
                      </ul>
                   </div>
                </div>
             </div>
          </div>
       </section>
       {/* Page Banner END */}

       {/* Contact Form Section */}
       <section>
          <div className="container">
             <div className="row g-4 g-lg-0 align-items-center">
                <div className="col-md-6 align-items-center text-center">
                    <Image src="/assets/images/element/contact.svg" alt="" width={500} height={500} style={{height:'auto'}} />
                </div>
                <div className="col-md-6">
                   <h2 className="mt-4 mt-md-0">Let&apos;s talk</h2>
                   <p>To request a quote or want to meet up for coffee, contact us directly or fill out the form and we will get back to you promptly</p>
                   <form>
                      <div className="mb-4 bg-light-input">
                         <label htmlFor="yourName" className="form-label">Your name *</label>
                         <input type="text" className="form-control form-control-lg" id="yourName" />
                      </div>
                      <div className="mb-4 bg-light-input">
                         <label htmlFor="emailInput" className="form-label">Email address *</label>
                         <input type="email" className="form-control form-control-lg" id="emailInput" />
                      </div>
                      <div className="mb-4 bg-light-input">
                         <label htmlFor="textareaBox" className="form-label">Message *</label>
                         <textarea className="form-control" id="textareaBox" rows={4}></textarea>
                      </div>
                      <div className="d-grid">
                         <button className="btn btn-lg btn-primary mb-0" type="button">Send Message</button>
                      </div>
                   </form>
                </div>
             </div>
          </div>
       </section>
    </main>
  );
}
