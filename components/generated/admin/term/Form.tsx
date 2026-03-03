import React from 'react';
import Link from 'next/link';

export default function Form(props: any) {
  return (
    <>
{form_start(form)}
    {form_widget(form)}
    <button className="btn btn-primary">{button_label|default('Save')}</button>
{form_end(form)}

    </>
  );
}
