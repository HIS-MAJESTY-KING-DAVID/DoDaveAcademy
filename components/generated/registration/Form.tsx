import React, { useState } from 'react';

interface RegistrationFormProps {
  userType?: 'student' | 'trainer';
  onSubmit?: (data: any) => void;
  invitationCode?: string;
}

export default function Form({ userType = 'student', onSubmit, invitationCode = '' }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    parentCode: invitationCode,
    // Student fields
    fullName: '',
    username: '',
    phoneNumber: '',
    // Trainer fields
    personne: {
      sexe: '',
      pays: '',
      imageFile: null as File | null,
      // Add other person fields if needed, simplified for now
    },
    enseignant: {
      specialite: '',
      // Add other teacher fields
      cvFile: null as File | null,
      diplomeFile: null as File | null,
    },
    // Common fields
    email: '',
    plainPassword: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Helper for nested state updates (for trainer)
  const handleNestedChange = (section: 'personne' | 'enseignant', field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, section: 'personne' | 'enseignant', field: string) => {
    if (e.target.files && e.target.files[0]) {
      handleNestedChange(section, field, e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    console.log('Registration submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4" id="registration_form">
      {/* Invitation Code */}
      <div className="mb-3">
        <label className="form-label">Invitation Code (Optional)</label>
        <input
          type="text"
          name="parentCode"
          className="form-control"
          value={formData.parentCode}
          onChange={handleInputChange}
          readOnly={!!invitationCode}
        />
        {invitationCode && <small className="text-muted">Invitation code applied automatically</small>}
      </div>

      {userType === 'trainer' ? (
        <>
          <div className="mb-4">
            <h5 className="mb-3">Personal Information</h5>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Gender</label>
                <select 
                  className="form-select" 
                  value={formData.personne.sexe}
                  onChange={(e) => handleNestedChange('personne', 'sexe', e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">Country</label>
                <select 
                  className="form-select"
                  value={formData.personne.pays}
                  onChange={(e) => handleNestedChange('personne', 'pays', e.target.value)}
                >
                  <option value="">Select Country</option>
                  <option value="CM">Cameroon</option>
                  {/* Add more countries */}
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">Profile Photo</label>
                <input 
                  type="file" 
                  className="form-control" 
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'personne', 'imageFile')}
                />
                <div className="form-text">Upload a profile photo (optional)</div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h5 className="mb-3">Teacher Information</h5>
            <div className="row g-3">
               <div className="col-12">
                <label className="form-label">Speciality</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={formData.enseignant.specialite}
                  onChange={(e) => handleNestedChange('enseignant', 'specialite', e.target.value)}
                />
              </div>
              <div className="col-12">
                <label className="form-label">CV</label>
                <input 
                  type="file" 
                  className="form-control" 
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, 'enseignant', 'cvFile')}
                />
                <div className="form-text">Upload CV</div>
              </div>
               <div className="col-12">
                <label className="form-label">Diploma</label>
                <input 
                  type="file" 
                  className="form-control" 
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, 'enseignant', 'diplomeFile')}
                />
                <div className="form-text">Upload Diploma</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleInputChange}
              minLength={5}
              maxLength={8}
              pattern="[a-zA-Z0-9_]+"
              title="Username must be 5-8 characters long and can only contain letters, numbers, and underscores"
              required
            />
            <small className="text-muted">Username must be 5-8 characters long</small>
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              className="form-control"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
        </>
      )}

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          name="plainPassword"
          className="form-control"
          value={formData.plainPassword}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="form-control"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <div className="form-check">
          <input
            type="checkbox"
            name="agreeTerms"
            className="form-check-input"
            checked={formData.agreeTerms}
            onChange={handleCheckboxChange}
            required
          />
          <label className="form-check-label">
            I agree to the terms and conditions
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100">Register</button>
    </form>
  );
}
