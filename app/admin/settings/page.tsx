import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) redirect('/login');

  const [siteSettings, socialSettings, networkConfig] = await Promise.all([
    prisma.siteSetting.findFirst(),
    prisma.socialSetting.findMany({ orderBy: { id: 'asc' } }),
    prisma.networkConfig.findFirst(),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Settings</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Site Settings</h2>
        <form action="/api/admin/settings/site" method="POST" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
            <input type="text" name="siteName" defaultValue={siteSettings?.siteName || ''}
              className="w-full px-3 py-2 border rounded text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Email</label>
            <input type="email" name="siteEmail" defaultValue={siteSettings?.siteEmail || ''}
              className="w-full px-3 py-2 border rounded text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
            <input type="email" name="supportEmail" defaultValue={siteSettings?.supportEmail || ''}
              className="w-full px-3 py-2 border rounded text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
            <input type="text" name="contactPhone" defaultValue={siteSettings?.contactPhone || ''}
              className="w-full px-3 py-2 border rounded text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Address</label>
            <input type="text" name="contactAddress" defaultValue={siteSettings?.contactAddress || ''}
              className="w-full px-3 py-2 border rounded text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
            <textarea name="siteDescription" rows={3} defaultValue={siteSettings?.siteDescription || ''}
              className="w-full px-3 py-2 border rounded text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Copyright</label>
            <input type="text" name="siteCopyrights" defaultValue={siteSettings?.siteCopyrights || ''}
              className="w-full px-3 py-2 border rounded text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Main Site URL</label>
            <input type="url" name="mainSiteUrl" defaultValue={siteSettings?.mainSiteUrl || ''}
              className="w-full px-3 py-2 border rounded text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <input type="hidden" name="isMaintenanceMode" value="false" />
            <input type="checkbox" name="isMaintenanceMode" value="true" id="maintenanceMode"
              defaultChecked={siteSettings?.isMaintenanceMode || false}
              className="rounded border-gray-300" />
            <label htmlFor="maintenanceMode" className="text-sm text-gray-700">Maintenance Mode</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Text</label>
            <input type="text" name="maintenanceText" defaultValue={siteSettings?.maintenanceText || ''}
              className="w-full px-3 py-2 border rounded text-sm" />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded text-sm hover:opacity-90">
              Save Site Settings
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Social Links</h2>
        {socialSettings.length > 0 && (
          <table className="w-full text-sm mb-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-gray-500 font-medium">Name</th>
                <th className="px-3 py-2 text-left text-gray-500 font-medium">URL</th>
                <th className="px-3 py-2 text-left text-gray-500 font-medium">Icon</th>
                <th className="px-3 py-2 text-left text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {socialSettings.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2">{s.name}</td>
                  <td className="px-3 py-2 text-blue-600 text-xs">{s.link}</td>
                  <td className="px-3 py-2"><i className={s.icon}></i> {s.icon}</td>
                  <td className="px-3 py-2">
                    <form action={`/api/admin/settings/social/${s.id}/delete`} method="POST" className="inline">
                      <button type="submit" className="text-red-600 hover:underline text-xs">Delete</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <form action="/api/admin/settings/social" method="POST" className="flex gap-2 items-end">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
            <input type="text" name="name" required
              className="px-3 py-2 border rounded text-sm" placeholder="Facebook" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">URL</label>
            <input type="text" name="link" required
              className="px-3 py-2 border rounded text-sm" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Icon Class</label>
            <input type="text" name="icon" required
              className="px-3 py-2 border rounded text-sm" placeholder="bi bi-facebook" />
          </div>
          <button type="submit"
            className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded text-sm hover:opacity-90">
            Add
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Network Configuration</h2>
        <form action="/api/admin/settings/network" method="POST" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Points per Invitation</label>
            <input type="number" name="pointsPerInvitation" defaultValue={networkConfig?.pointsPerInvitation || 0}
              className="w-full px-3 py-2 border rounded text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Distribution (%)</label>
            <input type="number" step="0.01" name="instructorDistributionPercentage"
              defaultValue={networkConfig?.instructorDistributionPercentage || 0}
              className="w-full px-3 py-2 border rounded text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student Distribution (%)</label>
            <input type="number" step="0.01" name="studentDistributionPercentage"
              defaultValue={networkConfig?.studentDistributionPercentage || 0}
              className="w-full px-3 py-2 border rounded text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exchange Rate</label>
            <input type="number" step="0.01" name="exchangeRate" defaultValue={networkConfig?.exchangeRate || 0}
              className="w-full px-3 py-2 border rounded text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Withdrawable</label>
            <input type="number" step="0.01" name="minimumWithdrawable"
              defaultValue={networkConfig?.minimumWithdrawable || 0}
              className="w-full px-3 py-2 border rounded text-sm" />
          </div>
          <div className="md:col-span-2">
            <button type="submit"
              className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded text-sm hover:opacity-90">
              Save Network Config
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
