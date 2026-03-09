import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Programs',
  description: 'Explore our comprehensive learning programs designed for deep mastery of specific fields. Start your career journey with DoDave Academy.',
};

export default function ProgramsPage() {
  return (
    <div className="container py-5">
      <h1>Programs</h1>
      <p>Explore our comprehensive learning programs.</p>
      {/* TODO: Implement programs list */}
      <div className="alert alert-info">Coming Soon</div>
    </div>
  );
}
