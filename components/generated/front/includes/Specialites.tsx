import React from 'react';
import Link from 'next/link';

export default function Specialites(props: any) {
  return (
    <>
<option value="">Specialites</option>
{% for s in filiere.specialites %}
    <option value="{s.slug}">{s.name}</option>

))}
    </>
  );
}
