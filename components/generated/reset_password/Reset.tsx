import React, { useState } from 'react';
import AuthLayout from '../security/AuthLayout';

export default function Reset() {
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset logic
    console.log('Password reset submitted');
  };

  return (
    <AuthLayout>
      <h2 className="mb-0 h3">Reset your password</h2>

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
            <label className="form-label">New Password</label>
            <input 
                type="password" 
                className="form-control" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                placeholder="Enter new password"
            />
        </div>
        <button className="btn btn-primary mb-3 w-100">Reset password</button>
      </form>
    </AuthLayout>
  );
}
