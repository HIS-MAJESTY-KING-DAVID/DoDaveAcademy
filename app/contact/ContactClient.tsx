'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { contacts } from '@/lib/contacts';

export default function ContactClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error('Failed to send');
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <main>
      <section className="pt-5 pb-0" style={{
        backgroundImage: 'url(/assets/images/element/map.svg)',
        backgroundPosition: 'center left',
        backgroundSize: 'cover'
      }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-6 text-center mx-auto">
              <h6 className="text-primary">Contact us</h6>
              <h1 className="mb-4">We&apos;re here to help!</h1>
            </div>
          </div>

          <div className="row g-4 g-md-5 mt-0 mt-lg-3">
            <div className="col-lg-4 mt-lg-0">
              <div className="card card-body bg-primary shadow py-5 text-center h-100">
                <h5 className="text-white mb-3">WhatsApp</h5>
                <ul className="list-inline mb-0">
                  <li className="list-item mb-3">
                    <a href="#" className="text-white"><i className="fas fa-fw fa-map-marker-alt me-2 mt-1"></i>Douala-Akwa / Carrefour Equinox TV, face Beneficial Assurance</a>
                  </li>
                  <li className="list-item mb-3">
                    <a href="#" className="text-white"><i className="fas fa-fw fa-phone-alt me-2"></i>{contacts.phone}</a>
                  </li>
                  <li className="list-item mb-0">
                    <a href="#" className="text-white"><i className="far fa-fw fa-envelope me-2"></i>{contacts.email}</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 mt-lg-0">
              <div className="card card-body shadow py-5 text-center h-100">
                <h5 className="mb-3">MTN</h5>
                <ul className="list-inline mb-0">
                  <li className="list-item mb-3 h6 fw-light">
                    <a href="#"><i className="fas fa-fw fa-phone-alt me-2"></i>{contacts.phone}</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 mt-lg-0">
              <div className="card card-body shadow py-5 text-center h-100">
                <h5 className="mb-3">Orange</h5>
                <ul className="list-inline mb-0">
                  <li className="list-item mb-3 h6 fw-light">
                    <a href="#"><i className="fas fa-fw fa-phone-alt me-2"></i>{contacts.phone}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row g-4 g-lg-0 align-items-center">
            <div className="col-md-6 align-items-center text-center">
              <Image src="/assets/images/element/contact.svg" alt="" width={500} height={500} style={{ height: 'auto' }} />
            </div>
            <div className="col-md-6">
              <h2 className="mt-4 mt-md-0">Let&apos;s talk</h2>
              <p>To request a quote or want to meet up for coffee, contact us directly or fill out the form and we will get back to you promptly</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 bg-light-input">
                  <label htmlFor="yourName" className="form-label">Your name *</label>
                  <input type="text" className="form-control form-control-lg" id="yourName" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="mb-4 bg-light-input">
                  <label htmlFor="emailInput" className="form-label">Email address *</label>
                  <input type="email" className="form-control form-control-lg" id="emailInput" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="mb-4 bg-light-input">
                  <label htmlFor="textareaBox" className="form-label">Message *</label>
                  <textarea className="form-control" id="textareaBox" rows={4} value={message} onChange={e => setMessage(e.target.value)} required></textarea>
                </div>
                {status === 'success' && <div className="alert alert-success">Message sent successfully!</div>}
                {status === 'error' && <div className="alert alert-danger">Failed to send message. Please try again.</div>}
                <div className="d-grid">
                  <button className="btn btn-lg btn-primary mb-0" type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
