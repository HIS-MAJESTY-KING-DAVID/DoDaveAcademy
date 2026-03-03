import React from 'react';
import Link from 'next/link';

export default function DeleteForm(props: any) {
  return (
    <>
<form className="" style="display: inline;" method="post" action="{path('app_admin_categorie_delete', {'id': categorie.id})}" onsubmit="return confirm('Are you sure you want to delete this item?');">
    <input type="hidden" name="_token" value="{csrf_token('delete' ~ categorie.id)}" />
    <button className="btn btn-danger-soft btn-sm">Delete</button>
</form>

    </>
  );
}
