import React from 'react';
import Link from 'next/link';

export default function EmailSetting(props: any) {
  return (
    <>
<!-- Email Settings content START -->
<div className="tab-pane" id="tab-6">
    <div className="card shadow">
        <!-- Card header -->
        <div className="card-header border-bottom">
            <h5 className="card-header-title mb-0">Email Settings</h5>
        </div>
        <!-- Card body START -->
        <div className="card-body">
            <!-- Email Template -->
            <p>En attente...</p>
        </div>
        <!-- Card body END -->
    </div>

    <div className="card shadow mt-5">
        <!-- Card header -->
        <div className="card-header border-bottom">
            <h5 className="card-header-title mb-0">Notification Settings</h5>
        </div>
        <!-- Card body START -->
        <div className="card-body">
            <!-- Email Template -->
            <div className="row g-4 mt-4">
                {notificationTypes.map(nt => (

                    <!-- Template Item -->
                    <div className="col-md-6 col-xxl-4">
                        <div className="bg-light rounded-3 d-flex justify-content-between align-items-center p-2">
                            <h6 className="mb-0"><a href="#">{nt.label|upper}</a></h6>
                            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-template-{loop.index}" className="btn btn-sm btn-round btn-dark flex-shrink-0 mb-0"><i className="far fa-edit fa-fw"></i></a>
                        </div>
                    </div>
                
))}
            </div>
        </div>
        <!-- Card body END -->
    </div>
</div>
<!-- Email Settings content END -->

{notificationTypeForms.map(form => (

    <!-- Popup modal for add faq START -->
    <div className="modal fade" id="modal-template-{loop.index}" tabindex="-1" aria-labelledby="addQuestionLabel-{loop.index}" aria-hidden="true">
        <div className="modal-dialog">
            {form_start(form)}
                <div className="modal-content">
                    <div className="modal-header bg-dark">
                        <h5 className="modal-title text-white" id="addQuestionLabel-{loop.index}">Edit notification</h5>
                        <button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                    </div>
                    <div className="modal-body">
                        {form_widget(form)}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger-soft my-0" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-success my-0">Save</button>
                    </div>
                </div>
            {form_end(form)}
        </div>
    </div>
    <!-- Popup modal for add faq END -->

))}
    </>
  );
}
