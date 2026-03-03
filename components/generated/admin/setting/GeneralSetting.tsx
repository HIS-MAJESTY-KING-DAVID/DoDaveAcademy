import React from 'react';
import Link from 'next/link';

export default function GeneralSetting(props: any) {
  return (
    <>
<!-- General Settings content START -->
					<div className="tab-pane" id="tab-2">

						<div className="card shadow">

							<!-- Card header -->
							<div className="card-header border-bottom">
								<h5 className="card-header-title">General Settings</h5>
							</div>

							<!-- Card body START -->
							<div className="card-body">
								{form_start(generalSettingForm)}

									<!-- Input item -->
									<div className="col-12">
										{form_row(generalSettingForm.mainSiteUrl)}
									</div>

									<!-- Switch item -->
									<div className="col-lg-4">
										<label className="form-label">Maintainance mode</label>
										<div className="form-check form-switch form-check-lg mb-0">
											{form_widget(generalSettingForm.isMaintenanceMode)}
											{form_label(generalSettingForm.isMaintenanceMode)}
										</div>
									</div>
		
									<!-- Textarea item -->
									<div className="col-lg-8">
										{form_row(generalSettingForm.maintenanceText)}	
									</div>
		
									<!-- Save button -->
									<div className="d-sm-flex justify-content-end">
										<button type="submit" className="btn btn-primary mb-0">Update</button>
									</div>
								{form_end(generalSettingForm)}
							</div>
							<!-- Card body END -->

						</div>
					</div>
					<!-- General Settings content END -->
    </>
  );
}
