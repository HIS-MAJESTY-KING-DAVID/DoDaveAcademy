import React, { useState } from 'react';
import Link from 'next/link';

interface AbonnementItem {
  id: number;
  label: string;
}

interface Plan {
  id: number;
  label: string;
  montant: number;
  isRecommended?: boolean;
  items: AbonnementItem[]; // Assuming items is an array of included items or their IDs
}

interface IndexProps {
  plans?: Plan[];
  abonnementItems?: AbonnementItem[];
}

export default function Index({ plans = [], abonnementItems = [] }: IndexProps) {
  const [isYearly, setIsYearly] = useState(false);

  const togglePeriod = () => {
    setIsYearly(!isYearly);
  };

  return (
    <>
      {/* =======================
      Page Banner START */}
      <section className="py-5 price-wrap">
        <div className="container">
          <div className="row g-4 position-relative mb-4">
            {/* SVG decoration */}
            <figure className="position-absolute top-0 start-0 d-none d-sm-block">
              <svg width="22px" height="22px" viewBox="0 0 22 22">
                <polygon className="fill-purple" points="22,8.3 13.7,8.3 13.7,0 8.3,0 8.3,8.3 0,8.3 0,13.7 8.3,13.7 8.3,22 13.7,22 13.7,13.7 22,13.7 "></polygon>
              </svg>
            </figure>
      
            {/* Title and Search */}
            <div className="col-lg-10 mx-auto text-center position-relative">
              {/* SVG decoration */}
              <figure className="position-absolute top-50 end-0 translate-middle-y d-none d-md-block">
                <svg width="27px" height="27px">
                  <path className="fill-orange" d="M13.122,5.946 L17.679,-0.001 L17.404,7.528 L24.661,5.946 L19.683,11.533 L26.244,15.056 L18.891,16.089 L21.686,23.068 L15.400,19.062 L13.122,26.232 L10.843,19.062 L4.557,23.068 L7.352,16.089 L-0.000,15.056 L6.561,11.533 L1.582,5.946 L8.839,7.528 L8.565,-0.001 L13.122,5.946 Z"></path>
                </svg>
              </figure>
              {/* Title */}
              <h1>Affordable Pricing Packages</h1>
              <p className="mb-4 pb-1">Choose the plan that suits you best.</p>

              {/* Switch START */}
              <form className="d-flex align-items-center justify-content-center">
                {/* Label */}
                <span className="h6 mb-0 fw-bold">Monthly</span>
                {/* Switch */}
                <div className="form-check form-switch form-check-lg mx-3 mb-0">
                  <input 
                    className="form-check-input mt-0 price-toggle" 
                    type="checkbox" 
                    id="flexSwitchCheckDefault" 
                    checked={isYearly}
                    onChange={togglePeriod}
                  />
                </div>
                {/* Label */}
                <div className="position-relative">
                  <span className="h6 mb-0 fw-bold">Yearly</span>
                  <span className="badge bg-danger bg-opacity-10 text-danger ms-1 position-absolute top-0 start-100 translate-middle mt-n2 ms-2 ms-md-5">10% discount</span>
                </div>
              </form>
              {/* Switch END */}
            </div>
          </div>
          {/* Pricing START */}
          <div className="row g-4">
            {plans.map(plan => (
              /* Pricing item START */
              <div className="col-md-6 col-xl-4" key={plan.id}>
                <div className="card border rounded-3 p-2 p-sm-4 h-100">
                  {/* Card Header */}
                  <div className="card-header p-0">
                    {/* Price and Info */}
                    <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-2">
                      {/* Info */}
                      <div>
                        <h5 className="mb-0">{plan.label}</h5>
                        {plan.isRecommended && (
                          <div className="badge bg-grad mb-0 rounded-pill">Recommended</div>
                        )}
                      </div>
                      {/* Price */}
                      <div>
                        <h4 className="text-success mb-0 plan-price">
                          {isYearly ? `${plan.montant * 12 * 0.9} XAF` : `${plan.montant} XAF`}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="position-relative my-3 text-center">
                    <hr />
                    <p className="small position-absolute top-50 start-50 translate-middle bg-body px-3">All plans included</p>
                  </div>

                  {/* Card Body */}
                  <div className="card-body pt-0">
                    <ul className="list-unstyled mt-2 mb-0">
                      {abonnementItems.map(item => {
                        const isIncluded = plan.items.some(i => i.id === item.id);
                        return isIncluded ? (
                          <li className="mb-3 h6 fw-light" key={item.id}>
                            <i className="bi bi-patch-check-fill text-success me-2"></i>{item.label}
                          </li>
                        ) : (
                          <li className="mb-3 h6 fw-light text-muted" key={item.id}>
                            <i className="bi bi-x-circle-fill text-danger me-2"></i>{item.label}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  
                  <div className="card-footer text-center d-grid pb-0">
                    <button type="button" className="btn btn-light mb-0">Get Started</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
