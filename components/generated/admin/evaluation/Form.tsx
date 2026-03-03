import React from 'react';
import Link from 'next/link';

export default function Form(props: any) {
  return (
    <>
{form_start(form)}
<div className="row g-4 mb-5">
    <div className="col-12">
        {form_row(form.titre)}
    </div>
    <div className="col-12">
        {form_row(form.description)}
    </div>
    <div className="col-12">
        {form_row(form.matiere)}
    </div>
    <div className="col-12">
        {form_row(form.classes)}
    </div>

    {is_granted('ROLE_ADMIN') && (

        <div className="col-sm-6 col-md-4">
            {form_row(form.startAt)}
        </div>
        <div className="col-sm-6 col-md-4">
            {form_row(form.endAt)}
        </div>
    
)}
    
    <div className="col-sm-6 col-md-4">
        {form_row(form.duree)}
    </div>
    <div className="col-12">
        {form_row(form.isGeneratedRandomQuestions)}
    </div>
</div>
<button className="btn btn-success-soft">
    {button_label|default('Enregistrer')}
</button>
{form_end(form)}

    </>
  );
}
