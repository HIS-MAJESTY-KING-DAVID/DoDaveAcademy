import React from 'react';
import Link from 'next/link';

export default function DeleteForm(props: any) {
  return (
    <>
<form method="post" action="{path('app_part_action_delete', {'id': part_action.id})}" onsubmit="return confirm('Are you sure you want to delete this item?');">
    <input type="hidden" name="_token" value="{csrf_token('delete' ~ part_action.id)}" />
    <button className="btn">Delete</button>
</form>

    </>
  );
}
