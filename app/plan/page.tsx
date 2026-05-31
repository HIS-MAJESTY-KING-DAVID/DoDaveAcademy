import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function PlanPage() {
  const subscriptions = await prisma.subscription.findMany({
    include: {
      subscriptionSubscriptionItems: {
        include: { subscriptionItem: true },
      },
    },
    orderBy: { amount: 'asc' },
  });

  return (
    <main>
      <section className="py-4">
        <div className="container">
          <div className="bg-light p-4 text-center rounded-3">
            <h1 className="m-0">Subscription Plans</h1>
            <p className="mb-0 mt-2">Choose the best plan for your learning journey</p>
            <div className="d-flex justify-content-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-dots mb-0">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Plans</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0">
        <div className="container">
          {subscriptions.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-crown fa-3x text-muted mb-3"></i>
              <p className="lead text-muted">No subscription plans available yet. Check back soon!</p>
              <Link href="/courses" className="btn btn-primary">Browse Courses</Link>
            </div>
          ) : (
            <div className="row g-4 justify-content-center">
              {subscriptions.map((plan) => (
                <div className={`col-lg-4 col-xl-3 ${plan.isRecommended ? 'mt-lg-n3' : ''}`} key={plan.id}>
                  <div className={`card shadow-sm border-0 h-100 ${plan.isRecommended ? 'border-primary border-2' : ''}`}>
                    {plan.isRecommended && (
                      <div className="card-header bg-primary text-white text-center py-2">
                        <small className="fw-bold">RECOMMENDED</small>
                      </div>
                    )}
                    <div className="card-body d-flex flex-column text-center p-4">
                      <h5 className="card-title">{plan.label}</h5>
                      <div className="my-3">
                        <span className="display-5 fw-bold text-primary">{plan.amount.toLocaleString()}</span>
                        <span className="text-muted"> CFA</span>
                        <p className="text-muted small">/{plan.duration} {plan.duration > 1 ? 'days' : 'day'}</p>
                      </div>
                      {plan.pointsCount && (
                        <p className="small text-muted"><i className="fas fa-gift me-1 text-success"></i> {plan.pointsCount} bonus points</p>
                      )}
                      <ul className="list-unstyled mt-3 mb-4 text-start">
                        {plan.subscriptionSubscriptionItems.map((item) => (
                          <li key={item.subscriptionItemId} className="mb-2">
                            <i className="fas fa-check-circle text-success me-2"></i>
                            {item.subscriptionItem?.label || 'Feature'}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto d-grid">
                        <Link href="/register" className={`btn ${plan.isRecommended ? 'btn-primary' : 'btn-outline-primary'}`}>
                          {plan.isRecommended ? 'Get Started' : 'Choose Plan'}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
