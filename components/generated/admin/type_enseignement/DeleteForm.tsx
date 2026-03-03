import React from 'react';
import Link from 'next/link';

export default function DeleteForm(props: any) {
  return (
    <>
<form method="post" style="display: inline;" action="{path('app_admin_type_enseignement_delete', {'id': type_enseignement.id})}" onsubmit="return confirm('Vous êtes sûre de vouloir poursuivre cette opération ?');">
    <input type="hidden" name="_token" value="{csrf_token('delete' ~ type_enseignement.id)}" />
    <button className="btn btn-danger-soft btn-sm">Delete</button>
</form>

    </>
  );
}
