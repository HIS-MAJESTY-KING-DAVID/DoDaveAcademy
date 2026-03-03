import React from 'react';
import Link from 'next/link';

export default function DeleteForm(props: any) {
  return (
    <>
<form method="post" style="display: inline;" action="{path('app_admin_sous_systeme_delete', {'id': sous_systeme.id})}" onsubmit="return confirm('Vous êtes sur de vouloir effectuer cette action ?');">
    <input type="hidden" name="_token" value="{csrf_token('delete' ~ sous_systeme.id)}" />
    <button className="btn btn-danger-soft btn-sm">Delete</button>
</form>

    </>
  );
}
