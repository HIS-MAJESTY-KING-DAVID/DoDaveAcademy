import React from 'react';
import Link from 'next/link';

export default function Form(props: any) {
  return (
    <>
{form_start(form)}
    <div className="mb-4">
        {form_row(form.question)}
    </div>
    <div className="mb-4">
        {form_row(form.proposition1)}
    </div>
    <div className="mb-4">
        {form_row(form.proposition2)}
    </div>
    <div className="mb-4">
        {form_row(form.proposition3)}
    </div>
    <div className="mb-4">
        {form_row(form.proposition4)}
    </div>
    <div className="mb-4">
        {form_row(form.propositionJuste)}
    </div>
    {form_rest(form)}
    <button className="btn btn-success-soft">{button_label|default('Enregistrer la question')}</button>
{form_end(form)}

    </>
  );
}
