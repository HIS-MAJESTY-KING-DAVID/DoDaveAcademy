import React from 'react';
import Link from 'next/link';

export default function Form(props: any) {
  return (
    <>
{form_start(registrationForm)}
    {registrationForm.parentCode is defined && (

        <div className="mb-4">
            <label for="exampleInputEmail1" className="form-label">{form_label(registrationForm.parentCode)}</label>
            <div className="input-group input-group-lg">
                <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-user"></i></span>
                {form_widget(registrationForm.parentCode)}
            </div>
        </div>
    
)}
    
    {% for item in registrationForm.personne %}
        <div className="mb-4">
            <label for="exampleInputEmail1" className="form-label">{form_label(item)}</label>
            <div className="input-group input-group-lg">
                {item is not same as registrationForm.personne.imageFile && (

                    <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-arrow-alt-circle-right"></i></span>
                
)}
                
                {form_widget(item)}
            </div>
        </div>
    
))}
    
    {registrationForm.email is defined && (
   
        <div className="mb-4">
            <label for="exampleInputEmail1" className="form-label">{form_label(registrationForm.email)}*</label>
            <div className="input-group input-group-lg">
                <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill"></i></span>
                {form_widget(registrationForm.email)}
            </div>
        </div>
    
)}
    
    {registrationForm.plainPassword is defined && (

        <div className="mb-4">
            <label for="exampleInputEmail1" className="form-label">{form_label(registrationForm.plainPassword)}*</label>
            <div className="input-group input-group-lg">
                <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-lock"></i></span>
                {form_widget(registrationForm.plainPassword)}
            </div>
        </div>
    
)}
    

    {registrationForm.enseignant is defined && (

        {% for item in registrationForm.enseignant %}
            <div className="mb-4">
                <label for="exampleInputEmail1" className="form-label">{form_label(item)}</label>
                <div className="input-group input-group-lg">
                    {item is same as registrationForm.enseignant.etablissement && (

                        <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-building"></i></span>
                    
)}
                    {form_widget(item)}
                </div>
            </div>
        
))}
    
)}

    {registrationForm.eleve is defined && (

        {% for item in registrationForm.eleve %}
            <div className="mb-4">
                <label for="exampleInputEmail1" className="form-label">{form_label(item)}</label>
                <div className="input-group input-group-lg">
                    <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-arrow-alt-circle-right"></i></span>
                    {form_widget(item)}
                </div>
            </div>
        
))}
    
)}

    {registrationForm.filieres is defined && (

        <!-- Check box -->
        <div className="mb-4">
            <label for="exampleInputEmail1" className="form-label">{form_label(registrationForm.filieres)}</label>
            <div className="input-group input-group-lg">
                {form_widget(registrationForm.filieres)}
            </div>
        </div>
    
)}
    
    {registrationForm.roles is defined && (

        <div className="mb-4">
            <label for="exampleInputEmail1" className="form-label">{form_label(registrationForm.roles)}*</label>
            <div className="input-group input-group-lg">
                <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-lock"></i></span>
                {form_widget(registrationForm.roles)}
            </div>
        </div>
    
)}

    {registrationForm.agreeTerms is defined && (

        <!-- Check box -->
        <div className="mb-4">
            <div className="form-check">
                {form_widget(registrationForm.agreeTerms)}
            </div>
        </div>
    
)}

    {form_rest(registrationForm)}
    
    <!-- Button -->
    <div className="align-items-center mt-0">
        <div className="d-grid">
            <button className="btn btn-primary mb-0" type="submit">Enregistrer</button>
        </div>
    </div>
{form_end(registrationForm)}
    </>
  );
}
