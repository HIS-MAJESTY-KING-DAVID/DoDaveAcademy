import React from 'react';
import Link from 'next/link';
import Form from './Form';

export default function New() {
  return (
    <div className="container">
      <h1>Create new User</h1>

      <Form />

      <div className="mt-3">
        <Link href="/user" className="btn btn-link">
          back to list
        </Link>
      </div>
    </div>
  );
}
