import React from 'react';
import Link from 'next/link';

export default function DeleteForm(props: any) {
  return (
    <>
<form method="post" action="{path}" style="display: inline;" onsubmit="return confirm('Are you sure you want to delete this item?');">
    <input type="hidden" name="_token" value="{token}" />
    <button className="btn {classes|default('')}">Delete</button>
</form>

    </>
  );
}
