import React from 'react';
import Link from 'next/link';

export default function DeleteForm(props: any) {
  return (
    <>
<form method="post" className="{form_class|default('')}" action="{path('app_instructor_chapitre_delete', {'slugChap': chapitre.slug, 'slug': cours.slug})}" onsubmit="return confirm('Vous êtes sure de vouloir supprimer définitivement ce chapitre?');">
    <input type="hidden" name="_token" value="{csrf_token('delete' ~ chapitre.id)}" />
    <button className="btn btn-sm btn-danger-soft">Supprimer</button>
</form>

    </>
  );
}
