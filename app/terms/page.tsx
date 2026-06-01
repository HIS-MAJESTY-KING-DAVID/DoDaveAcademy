import { Metadata } from 'next';
import Link from 'next/link';
import { contacts } from '@/lib/contacts';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Review our terms of service and privacy policy. Understand your rights and responsibilities when using the DoDave Academy platform.',
};

export default function TermsPage() {
  return (
    <main>
      <section className="py-4">
        <div className="container">
          <div className="bg-light p-4 text-center rounded-3">
            <h1 className="m-0">Terms & Conditions</h1>
            <div className="d-flex justify-content-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-dots mb-0">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Terms & Conditions</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4 p-lg-5">
                  <h2>1. Acceptance of Terms</h2>
                  <p>By accessing and using the DoDave Academy platform, you accept and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use our platform.</p>

                  <h2 className="mt-4">2. Account Registration</h2>
                  <p>To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account. You must provide accurate and complete information during registration.</p>

                  <h2 className="mt-4">3. Course Enrollment & Access</h2>
                  <p>Upon enrollment, you receive a limited, non-transferable license to access the course content for personal educational purposes. Course materials may not be redistributed, reproduced, or sold without explicit written permission from DoDave Academy.</p>

                  <h2 className="mt-4">4. Payments & Refunds</h2>
                  <p>All payments are processed securely through our payment partners. Course fees are clearly displayed before purchase. Refund requests are evaluated on a case-by-case basis. Subscription plans auto-renew unless cancelled before the renewal date.</p>

                  <h2 className="mt-4">5. Instructor Obligations</h2>
                  <p>Instructors agree to provide accurate course descriptions, high-quality content, and timely responses to student inquiries. DoDave Academy reserves the right to remove content that violates our community standards.</p>

                  <h2 className="mt-4">6. Code of Conduct</h2>
                  <p>Users agree to:</p>
                  <ul>
                    <li>Respect other users and instructors</li>
                    <li>Not engage in harassment, hate speech, or discriminatory behavior</li>
                    <li>Not attempt to circumvent payment systems or access controls</li>
                    <li>Not use the platform for illegal activities</li>
                  </ul>

                  <h2 className="mt-4">7. Intellectual Property</h2>
                  <p>All content on DoDave Academy, including course materials, logos, and platform code, is owned by DoDave Academy or its licensors and is protected by applicable intellectual property laws.</p>

                  <h2 className="mt-4">8. Limitation of Liability</h2>
                  <p>DoDave Academy provides the platform &quot;as is&quot; without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>

                  <h2 className="mt-4">9. Termination</h2>
                  <p>We reserve the right to suspend or terminate accounts that violate these terms. Upon termination, your access to paid content may be revoked without refund if the violation is severe.</p>

                  <h2 className="mt-4">10. Changes to Terms</h2>
                  <p>We may update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms. We will notify users of material changes via email or platform notification.</p>

                  <h2 className="mt-4">11. Contact</h2>
                  <p>For questions about these terms, contact us at <a href={`mailto:${contacts.email}`}>{contacts.email}</a> or visit our <Link href="/contact">Contact page</Link>.</p>

                  <p className="text-muted mt-5"><em>Last updated: May 10, 2026</em></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
