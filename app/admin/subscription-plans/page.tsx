import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminSubscriptionPlansPage() {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) redirect('/login');

  const plans = await prisma.subscription.findMany({
    orderBy: { id: 'asc' },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Subscription Plans</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">ID</th>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">Label</th>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">Amount</th>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">Duration</th>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">Recommended</th>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {plans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{plan.id}</td>
                    <td className="px-4 py-3 font-medium">{plan.label}</td>
                    <td className="px-4 py-3">{plan.amount ? `${plan.amount} CFA` : '-'}</td>
                    <td className="px-4 py-3">{plan.duration ? `${plan.duration} days` : '-'}</td>
                    <td className="px-4 py-3">
                      {plan.isRecommended ? <span className="text-green-600 text-xs">Yes</span> : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <form action={`/api/admin/subscription-plans/${plan.id}/delete`} method="POST" className="inline">
                        <button type="submit" className="text-red-600 hover:underline text-xs">Delete</button>
                      </form>
                    </td>
                  </tr>
                ))}
                {plans.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No plans found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Plan</h2>
          <form action="/api/admin/subscription-plans" method="POST" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Label *</label>
              <input type="text" name="label" required
                className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (CFA) *</label>
              <input type="number" name="amount" required min={0}
                className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days) *</label>
              <input type="number" name="duration" required min={1}
                className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="isRecommended" id="isRecommended" value="1"
                className="rounded border-gray-300" />
              <label htmlFor="isRecommended" className="text-sm font-medium text-gray-700">Recommended</label>
            </div>
            <button type="submit"
              className="w-full px-4 py-2 bg-[var(--brand-primary)] text-white rounded text-sm hover:opacity-90">
              Create Plan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
