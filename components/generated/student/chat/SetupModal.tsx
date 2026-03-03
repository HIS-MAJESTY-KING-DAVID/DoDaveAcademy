import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

interface SetupModalProps {
  isProfileComplete?: boolean;
  isPremium?: boolean;
  onSave?: (data: any) => void;
}

export default function SetupModal({ isProfileComplete = false, isPremium = false, onSave }: SetupModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize bootstrap modal if needed, or rely on parent to show it
    // In React/Next.js with Bootstrap 5, we might use a library or manual JS
    if (typeof window !== 'undefined' && modalRef.current) {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap) {
         const modal = new bootstrap.Modal(modalRef.current);
         modal.show();
      }
    }
  }, []);

  return (
    <div className="modal fade" id="setupModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-hidden="true" ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="setupModalLabel">SETUP_PROFILE_KEY</h5>
          </div>
          <div className="modal-body">
            {/* Class Setup Section */}
            <div id="class-setup-section" className={isProfileComplete ? 'd-none' : ''}>
              <div className="profile-setup-section mb-4">
                <h6>COMPLETE_YOUR_PROFILE_KEY</h6>
                <p>SELECT_CLASS_DESCRIPTION_KEY</p>
                <form id="setup-form" method="POST" action="/student/chat/update-profile">
                  <div className="mb-3">
                    <label htmlFor="classe" className="form-label">SELECT_CLASS_KEY</label>
                    <select className="form-select" id="classe" name="classe" required>
                      <option value="">CHOOSE_CLASS_KEY</option>
                      {/* Options should be populated */}
                    </select>
                    <div className="invalid-feedback">
                      PLEASE_SELECT_CLASS_KEY
                    </div>
                  </div>

                  <div className="mb-3" id="specialization-group" style={{ display: 'none' }}>
                    <label htmlFor="specialite" className="form-label">SELECT_YOUR_SPECIALIZATION_KEY</label>
                    <select className="form-select" id="specialite" name="specialite">
                      <option value="">CHOOSE_SPECIALIZATION_KEY</option>
                    </select>
                    <div className="invalid-feedback">
                      PLEASE_SELECT_SPECIALIZATION_KEY
                    </div>
                  </div>

                  <div className="text-end">
                    <button type="submit" className="btn btn-primary">SAVE_SETUP_KEY</button>
                  </div>
                </form>
              </div>
            </div>

            {/* Premium Setup Section */}
            <div id="premium-setup-section" className={!isProfileComplete ? 'd-none' : ''}>
              {!isPremium ? (
                <div className="premium-upgrade-section">
                  <h6>PREMIUM_REQUIRED_KEY</h6>
                  <p>PREMIUM_CHAT_DESCRIPTION_KEY</p>
                  <div className="text-center mt-3">
                    <Link href="/plan" className="btn btn-success">BECOME_PREMIUM_KEY</Link>
                  </div>
                </div>
              ) : (
                <div className="setup-complete-section text-center">
                  <div className="mb-3">
                    <i className="fas fa-check-circle text-success fa-3x"></i>
                  </div>
                  <h6>SETUP_COMPLETE_KEY</h6>
                  <p>SETUP_COMPLETE_DESCRIPTION_KEY</p>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal">CONTINUE_KEY</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
