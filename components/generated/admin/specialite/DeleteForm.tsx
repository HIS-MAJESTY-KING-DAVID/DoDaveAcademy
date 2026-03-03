import React from 'react';
import Link from 'next/link';

export default function DeleteForm(props: any) {
  return (
    <>
<form method="post" style="display: inline;" action="{path('app_admin_specialite_delete', {'id': specialite.id})}" onsubmit="return confirm('Are you sure you want to delete this item?');">
    <input type="hidden" name="_token" value="{csrf_token('delete' ~ specialite.id)}" />
    <button className="btn btn-danger-soft btn-sm">Delete</button>
</form>

    </>
  );
}
