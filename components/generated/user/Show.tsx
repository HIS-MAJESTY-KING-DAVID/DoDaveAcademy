import React from 'react';
import Link from 'next/link';
import DeleteForm from './DeleteForm';

export default function Show({ user }: { user: any }) {
  return (
    <div className="container">
      <h1>User</h1>

      <table className="table">
        <tbody>
          <tr>
            <th>Id</th>
            <td>{user.id}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>Password</th>
            <td>{user.password}</td>
          </tr>
        </tbody>
      </table>

      <div className="d-flex gap-2">
        <Link href="/user" className="btn btn-secondary">
          back to list
        </Link>

        <Link href={`/user/${user.id}/edit`} className="btn btn-primary">
          edit
        </Link>

        <DeleteForm id={user.id} />
      </div>
    </div>
  );
}
