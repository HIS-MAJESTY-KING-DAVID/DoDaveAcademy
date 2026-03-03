export interface NotificationType {
  id: number | null;
  label: string | null;
  notificationSettings: any[];
  type: string | null;
  notificationTemplate: NotificationTemplate | null;
}
