import React from 'react';
import Link from 'next/link';

export default function Edit(props: any) {
  return (
    <>
<div className="modal-dialog">
    {form_start(form)}
        <div className="modal-content">
            <!-- Modal header -->
            <div className="modal-header bg-dark">
                <h5 className="modal-title text-white" id="viewReviewLabel">Edit</h5>
                <button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
            </div>
            <!-- Modal body -->
            <div className="modal-body">
                {form_row(form)}
            </div>
            <!-- Modal footer -->
            <div className="modal-footer">
                <button type="button" className="btn btn-danger-soft my-0" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-success-soft my-0">Edit</button>
            </div>
        </div>
    {form_end(form)}
</div>
    </>
  );
}
