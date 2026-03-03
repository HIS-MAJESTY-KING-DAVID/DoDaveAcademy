import React from 'react';
import Link from 'next/link';

export default function Classes(props: any) {
  return (
    <>
<option value="">Classes</option>
{% for s in specialite.classes  %}
    <option value="{s.slug}">{s.name}</option>

))}
    </>
  );
}
