export interface SiteSetting {
  id: number | null;
  siteName: string | null;
  siteCopyrights: string | null;
  siteEmail: string | null;
  siteDescription: string | null;
  contactPhone: string | null;
  supportEmail: string | null;
  contactAddress: string | null;
  mainSiteUrl: string | null;
  isMaintenanceMode: boolean | null;
  maintenanceText: string | null;
}
