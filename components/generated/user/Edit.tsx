import React from 'react';
import Link from 'next/link';
import Form from './Form';
import DeleteForm from './DeleteForm';

export default function Edit({ user }: { user: any }) {
  return (
    <div className="container">
      <h1>Edit User</h1>

      <Form buttonLabel="Update" initialValues={user} />

      <div className="mt-3 d-flex gap-2">
        <Link href="/user" className="btn btn-link">
          back to list
        </Link>
        
        <DeleteForm id={user.id} />
      </div>
    </div>
  );
}
