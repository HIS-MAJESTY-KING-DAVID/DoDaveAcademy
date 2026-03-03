import React from 'react';
import Link from 'next/link';

export default function DeleteForm(props: any) {
  return (
    <>
<form method="post" action="{path('app_lesson_delete', {'id': lesson.id})}" onsubmit="return confirm('Are you sure you want to delete this item?');">
    <input type="hidden" name="_token" value="{csrf_token('delete' ~ lesson.id)}" />
    <button className="btn"><i className="fas fa-trash"></i></button>
</form>

    </>
  );
}
