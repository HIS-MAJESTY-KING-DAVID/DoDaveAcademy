import React from 'react';
import Link from 'next/link';

interface SubscriptionItem {
  label: string;
}

interface Abonnement {
  label: string;
  duree: number; // Duration in days?
  items: SubscriptionItem[];
}

interface ActivePlan {
  abonnement: Abonnement;
  amount: number;
  expiredAt: string; // ISO date string
}

interface SubscriptionsProps {
  activePlan?: ActivePlan;
  nbJoursEcoules?: number;
}

export default function Subscriptions({ activePlan, nbJoursEcoules = 0 }: SubscriptionsProps) {
  const calculateProgress = () => {
    if (!activePlan) return 0;
    const duration = activePlan.abonnement.duree;
    const remaining = duration - nbJoursEcoules;
    const percent = 100 - (remaining / duration * 100); // Wait, logic seems to be: 100 - ( (duration - elapsed) / 100 )? No, usually (elapsed / duration) * 100.
    // The original code: (100 - ((activePlan.abonnement.duree - nbJoursEcoules) / 100))
    // If duration=30, elapsed=10. remaining=20. (20/100) = 0.2. 100 - 0.2 = 99.8. This seems wrong if it's percentage.
    // Assuming original logic was attempting percentage: (elapsed / duration) * 100.
    // Let's stick to a safe progress calculation: (nbJoursEcoules / activePlan.abonnement.duree) * 100.
    return Math.min(100, Math.max(0, (nbJoursEcoules / activePlan.abonnement.duree) * 100));
  };

  const progress = calculateProgress();

  return (
    <>
      {activePlan && (
        <div className="card card-body bg-transparent border rounded-3">
          {/* Update plan START */}
          <div className="row g-4">
            {/* Update plan item */}
            <div className="col-6 col-lg-3">
              <span>Active Plan</span>
              <h4>{activePlan.abonnement.label}</h4>
            </div>
            {/* Update plan item */}
            <div className="col-6 col-lg-3">
              <span>Monthly limit</span>
              <h4>Unlimited</h4>
            </div>
            {/* Update plan item */}
            <div className="col-6 col-lg-3">
              <span>Cost</span>
              <h4>{activePlan.amount} XAF</h4>
            </div>

            {/* Update plan item */}
            <div className="col-6 col-lg-3">
              <span>Renewal Date</span>
              <h4>{new Date(activePlan.expiredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</h4>
            </div>
          </div>
          {/* Update plan END */}

          {/* Progress bar */}
          <div className="overflow-hidden my-4">
            <h6 className="mb-0">{progress.toFixed(2)}%</h6>
            <div className="progress progress-sm bg-primary bg-opacity-10">
              <div 
                className="progress-bar bg-primary aos" 
                role="progressbar" 
                data-aos="slide-right" 
                data-aos-delay="200" 
                data-aos-duration="1000" 
                data-aos-easing="ease-in-out" 
                style={{ width: `${progress}%` }} 
                aria-valuenow={progress} 
                aria-valuemin={0} 
                aria-valuemax={100}
              >
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr />

          {/* Plan Benefits */}
          <div className="row">
            <h6 className="mb-3">The plan includes</h6>
            <div className="col-md-12">
              <ul className="list-unstyled row">
                {activePlan.abonnement.items.map((item, index) => (
                  <div className="col-md-6" key={index}>
                    <li className="mb-3 h6 fw-light">
                      <i className="bi bi-patch-check-fill text-success me-2"></i>{item.label}
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
