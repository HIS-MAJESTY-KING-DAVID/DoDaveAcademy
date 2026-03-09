import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing Plans',
  description: 'Choose the best plan for your learning journey. Flexible pricing options for students and professionals at DoDave Academy.',
};

export default function PlanPage() {
  return (
    <div className="container py-5">
      <h1>Subscription Plans</h1>
      <p>Choose the best plan for your learning journey.</p>
      {/* TODO: Implement pricing table */}
      <div className="alert alert-info">Coming Soon</div>
    </div>
  );
}
