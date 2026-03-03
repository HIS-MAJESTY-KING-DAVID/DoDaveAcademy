import React from 'react';
import Link from 'next/link';

export default function Form(props: any) {
  return (
    <>
{form_start(form, {'attr': {'class': 'row g-4'}
) }}
    
<div className="col-md-6">
    {form_row(form.label)}
</div>
<div className="col-md-3">
    {form_row(form.duree)}
</div>
<div className="col-md-3">
    {form_row(form.NbrePoint)}
</div>
<div className="col-md-3">
    {form_row(form.montant)}
</div>
<div className="col-md-12">
    {form_row(form.paymentMethods)}
</div>
{% for item in form.items %}
    <div className="col-md-4">
        {form_row(item)}
    </div>

))}
<div className="col-md-12">
    {form_row(form.isRecommended)}
</div>
<div className="col-12">
    <button className="btn btn-success" type="submit">
        {button_label|default('created')}
    </button>
</div>
{form_end(form)}
<!-- Modal START -->
<div className="modal fade" id="itemAbonnementModal" tabindex="-1" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header border-0 bg-transparent">
                <!-- Close button -->
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <!-- Modal body -->
            <div className="modal-body px-5 pb-5 position-relative overflow-hidden">
                <div className="d-flex mb-4 mt-3">
                    {form_start(itemForm)}
                    {form_widget(itemForm)}
                    {redirectUri is defined && (

                        <input type="hidden" name="redirectUri" value="{redirectUri}" />
                        
)}
                        <button type="submit" className="btn btn-primary mt-3">
                            Save
                        </button>
                        {form_end(itemForm)}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal END -->
    
    </>
  );
}
