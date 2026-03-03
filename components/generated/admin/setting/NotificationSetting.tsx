import React from 'react';
import Link from 'next/link';

export default function NotificationSetting(props: any) {
  return (
    <>
<!-- Notification setting content START -->
<div className="tab-pane" id="tab-3">
    <!-- Notification START -->
    <div className="card shadow">
        <!-- Card header -->
        <div className="card-header border-bottom">
            <h5 className="card-header-title">Notifications Settings</h5>
        </div>

        <!-- Card body -->
        <div className="card-body">
            <!-- General nofification -->
            <h6 className="mb-2">Choose type of notifications you want to receive</h6>
            <div className="form-check form-switch form-check-md mb-3">
                <input className="form-check-input" type="checkbox" id="checkPrivacy12" checked="" />
                <label className="form-check-label" for="checkPrivacy12">Withdrawal activity</label>
            </div>
            <div className="form-check form-switch form-check-md mb-3">
                <input className="form-check-input" type="checkbox" id="checkPrivacy2" />
                <label className="form-check-label" for="checkPrivacy2">Weekly report</label>
            </div>
            <div className="form-check form-switch form-check-md mb-3">
                <input className="form-check-input" type="checkbox" id="checkPrivacy3" checked="" />
                <label className="form-check-label" for="checkPrivacy3">Password change</label>
            </div>
            <div className="form-check form-switch form-check-md mb-0">
                <input className="form-check-input" type="checkbox" id="checkPrivacy4" />
                <label className="form-check-label" for="checkPrivacy4">Play sound on a message</label>
            </div>

            <!-- Instructor notification -->
            <h6 className="mb-2 mt-4">Instructor Related Notification</h6>
            <div className="form-check form-switch form-check-md mb-3">
                <input className="form-check-input" type="checkbox" id="checkPrivacy11" checked="" />
                <label className="form-check-label" for="checkPrivacy5">Joining new instructors</label>
            </div>
            <div className="form-check form-switch form-check-md mb-3">
                <input className="form-check-input" type="checkbox" id="checkPrivacy5" />
                <label className="form-check-label" for="checkPrivacy5">Notify when the instructorss added new courses</label>
            </div>
            <div className="form-check form-switch form-check-md mb-3">
                <input className="form-check-input" type="checkbox" id="checkPrivacy6" checked="" />
                <label className="form-check-label" for="checkPrivacy6">Notify when instructors update courses</label>
            </div>
            <div className="form-check form-switch form-check-md mb-0">
                <input className="form-check-input" type="checkbox" id="checkPrivacy7" />
                <label className="form-check-label" for="checkPrivacy7">Course weekly report</label>
            </div>

            <!-- Student notification -->
            <h6 className="mb-2 mt-4">Student Related Notification</h6>
            <div className="form-check form-switch form-check-md mb-3">
                <input className="form-check-input" type="checkbox" id="checkPrivacy8" checked="" />
                <label className="form-check-label" for="checkPrivacy8">Joining new student</label>
            </div>
            <div className="form-check form-switch form-check-md mb-3">
                <input className="form-check-input" type="checkbox" id="checkPrivacy9" />
                <label className="form-check-label" for="checkPrivacy9">Notify when students purchase new courses</label>
            </div>
            <div className="form-check form-switch form-check-md mb-0">
                <input className="form-check-input" type="checkbox" id="checkPrivacy10" />
                <label className="form-check-label" for="checkPrivacy10">Course weekly report</label>
            </div>
        </div>
    </div>
    <!-- Notification START -->
</div>
<!-- Notification setting content END -->
    </>
  );
}
