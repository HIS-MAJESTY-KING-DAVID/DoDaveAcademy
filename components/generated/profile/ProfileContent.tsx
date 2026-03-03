import React from 'react';
import Link from 'next/link';

export default function ProfileContent(props: any) {
  return (
    <>
    <!-- Edit profile START -->
    <div className="card bg-transparent border rounded-3">
        <!-- Card header -->
        <div className="card-header bg-transparent border-bottom">
            <h3 className="card-header-title mb-0">Edit Profile</h3>
        </div>
        <!-- Card body START -->
        <div className="card-body">
            <!-- Form -->
            {/* <form className="row g-4"> */}
            {form_start(personneForm, {'attr': {'class': 'row g-4'}) }}
                {form_errors(personneForm) && (

                    <div className="alert alert-danger">{form_errors(personneForm)}</div>
                
)}
                <!-- Profile picture -->
                <div className="col-12 justify-content-center align-items-center">
                    <label className="form-label">Profile picture</label>
                    <div className="d-flex align-items-center">
                        <label className="position-relative me-4" for="personne_form_imageFile" title="Replace this picture">
                            <!-- Avatar place holder -->
                            <span className="avatar avatar-xl">
                                <img id="personne_form_imageFile-preview" className="avatar-img rounded-circle border border-white border-3 shadow" src="{asset(personne.avatarPath)}" alt="" />
                            </span>
                            <!-- Remove btn -->
                            <button type="button" className="uploadremove"><i className="bi bi-x text-white"></i></button>
                        </label>
                        <!-- Upload button -->
                        <label className="btn btn-primary-soft mb-0" for="personne_form_imageFile">Change</label>
                        {form_widget(personneForm.imageFile, {'attr': {'class': 'd-none'}) }}
                    </div>
                </div>

                <!-- Full name -->
                <div className="col-12">
                    <label className="form-label">Full name</label>
                    <div className="input-group">
                        {form_widget(personneForm.lastName)}
                        {form_widget(personneForm.firstName)}
                    </div>
                </div>

                <!-- Username -->
                <div className="col-md-6">
                    <label className="form-label">Username</label>
                    <div className="input-group">
                        <span className="input-group-text">kulmapeck.com</span>
                        {form_widget(personneForm.pseudo)}
                    </div>
                </div>

                <!-- Phone number -->
                <div className="col-md-6">
                    <label className="form-label">Phone number</label>
                    {form_widget(personneForm.telephone)}
                </div>

                <!-- Location -->
                <div className="col-md-12">
                    <label className="form-label">Location</label>
                    <div className="input-group">
                        {form_widget(personneForm.adresse)}
                        {form_widget(personneForm.pays, {'attr': {'class': 'js-choice'}) }}
                    </div>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Birthday</label>
                    <div className="input-group">
                        {form_widget(personneForm.bornAt)}
                        {form_widget(personneForm.lieuNaissance)}
                        {form_widget(personneForm.sexe, {'attr': {'class': 'js-choice'}) }}
                    </div>
                </div>
                
                {form_rest(personneForm)}
                <!-- Save button -->
                <div className="d-sm-flex justify-content-end">
                    <button type="submit" className="btn btn-primary mb-0">Save changes</button>
                </div>
            {form_end(personneForm)}
        </div>
        <!-- Card body END -->
    </div>
    <!-- Edit profile END -->
				
    <div className="row g-4 mt-3">
        <!-- EMail change START -->
        <div className="col-lg-6">
            <div className="card bg-transparent border rounded-3">
                <!-- Card header -->
                <div className="card-header bg-transparent border-bottom">
                    <h5 className="card-header-title mb-0">{app.user.email && (
Modifier l'email
) || (
Ajouter un email
)}</h5>
                </div>
                <!-- Card body -->
                <div className="card-body">
                    {app.user.email && (

                        <p className="alert alert-warning">Attention: Cette action est irréversible.</p>
                    
) || (

                        <p className="alert alert-info">Ajoutez votre email pour sécuriser votre compte et recevoir des notifications importantes.</p>
                    
)}

                    {% set changeEmailUri = path(app.user.eleve ? 'app_student_profile_change_email' : 
                                               app.user.enseignant ? 'app_instructor_profile_change_email' : 
                                               'app_profile_change_email') %}
                    
                    <form action="{changeEmailUri}" method="post" className="mt-4">
                        {app.user.email && (

                            <div className="mb-3">
                                <label className="form-label">Email actuel</label>
                                <input type="email" className="form-control" value="{app.user.email}" disabled />
                            </div>
                        
)}
                        
                        <div className="mb-3">
                            <label className="form-label">{app.user.email && (
Nouvel email
) || (
Votre email
)}</label>
                            <input type="email" name="new_email" className="form-control" required />
                        </div>

                        <input type="hidden" name="_csrf_token" value="{csrf_token('change_email')}" />
                        
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary mb-0">
                                {app.user.email && (
Modifier l'email
) || (
Ajouter l'email
)}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Email change END -->
        
        <!-- Password change START -->
        <div className="col-lg-6">
            <div className="card border bg-transparent rounded-3">
                <!-- Card header -->
                <div className="card-header bg-transparent border-bottom">
                    <h5 className="card-header-title mb-0">Update password</h5>
                </div>
                
                <div className="d-flex justify-content-end mt-4">
                    <a href="{url("app_forgot_password_request")}" className="btn btn-primary-soft">Reset password</a>
                </div>
                <!-- Card body END -->
            </div>
        </div>
        <!-- Password change end -->
    </div>
    </>
  );
}
