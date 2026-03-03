import React from 'react';
import Link from 'next/link';

export default function DeleteForm(props: any) {
  return (
    <>
<form method="post" action="{path('app_admin_abonnement_delete', {'id': abonnement.id})}" onsubmit="return confirm('Are you sure you want to delete this item?');">
    <input type="hidden" name="_token" value="{csrf_token('delete' ~ abonnement.id)}" />
    <button className="btn btn-danger mt-2">Delete</button>
</form>

    </>
  );
}
