import React from 'react';
import Link from 'next/link';

export default function Index({ users }: { users: any[] }) {
  return (
    <div className="container">
      <h1>User index</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Password</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <Link href={`/user/${user.id}`} className="btn btn-sm btn-info me-1">
                    show
                  </Link>
                  <Link href={`/user/${user.id}/edit`} className="btn btn-sm btn-primary">
                    edit
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>no records found</td>
            </tr>
          )}
        </tbody>
      </table>

      <Link href="/user/new" className="btn btn-success">
        Create new
      </Link>
    </div>
  );
}
