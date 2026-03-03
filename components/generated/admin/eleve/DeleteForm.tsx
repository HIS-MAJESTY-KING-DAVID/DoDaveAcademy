import React from 'react';
import Link from 'next/link';

export default function DeleteForm(props: any) {
  return (
    <>
<form method="post" action="{path('app_admin_eleve_delete', {'id': eleve.id})}" onsubmit="return confirm('Are you sure you want to delete this item?');">
    <input type="hidden" name="_token" value="{csrf_token('delete' ~ eleve.id)}" />
    <button className="dropdown-item"><i className="bi bi-trash fa-fw me-2"></i>Remove</button>
</form>

    </>
  );
}
