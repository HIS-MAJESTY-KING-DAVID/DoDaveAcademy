import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Review our terms of service and privacy policy. Understand your rights and responsibilities when using the DoDave Academy platform.',
};

export default function TermsPage() {
  return (
    <div className="container py-5">
      <h1>Terms & Conditions</h1>
      <p>Please read our terms of service and privacy policy.</p>
      {/* TODO: Add legal text */}
      <div className="alert alert-info">Coming Soon</div>
    </div>
  );
}
