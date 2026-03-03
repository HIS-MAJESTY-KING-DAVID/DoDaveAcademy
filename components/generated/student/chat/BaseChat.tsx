import React from 'react';
import Link from 'next/link';

// This is just a base layout wrapper, but since we are using React, we might just use StudentLayout
// However, to keep file structure, we can make it a wrapper.

export default function BaseChat({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Additional stylesheets would be handled in _app.tsx or layout.tsx in Next.js */}
      {/* <link rel="stylesheet" href="/css/subject_chat.css" /> */}
      
      {children}
    </>
  );
}
