import React from 'react';
import Link from 'next/link';

export default function WebsiteSetting(props: any) {
  return (
    <>
<!-- Personal Information content START -->
<div className="tab-pane show active" id="tab-1">
    <div className="card shadow">

        <!-- Card header -->
        <div className="card-header border-bottom">
            <h5 className="card-header-title">Website Settings</h5>
        </div>

        <!-- Card body START -->
        <div className="card-body">
            {form_start(siteSettingForm)}

                <!-- Input item -->
                <div className="col-lg-4">
                    {form_row(siteSettingForm.siteName)}
                </div>

                <!-- Input item -->
                <div className="col-lg-4">
                    {form_row(siteSettingForm.siteCopyrights)}
                </div>

                <!-- Input item -->
                <div className="col-lg-4">
                    {form_row(siteSettingForm.siteEmail)}
                </div>

                <!-- Textarea item -->
                <div className="col-12">
                    {form_row(siteSettingForm.siteDescription)}
                </div>

                <!-- Input item -->
                <div className="col-lg-6">
                    {form_row(siteSettingForm.contactPhone)}
                </div>

                <!-- Input item -->
                <div className="col-lg-6">
                    {form_row(siteSettingForm.supportEmail)}
                </div>

                <!-- Textarea item -->
                <div className="col-12">
                    {form_row(siteSettingForm.contactAddress)}
                </div>

                <!-- Save button -->
                <div className="d-sm-flex justify-content-end">
                    <button type="submit" className="btn btn-primary mb-0">Update</button>
                </div>
            {form_end(siteSettingForm)}
        </div>
        <!-- Card body END -->

    </div>			
</div>
<!-- Personal Information content END -->
    </>
  );
}
