import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
<!DOCTYPE html>

<title>NotificationTemplate index</title>

{% block body %}
    <h1>NotificationTemplate index</h1>

    <table className="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Template</th>
                <th>NotificationType</th>
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
        {notification_templates.map(notification_template => (

            <tr>
                <td>{notification_template.id}</td>
                <td>{notification_template.template}</td>
                <td>{notification_template.notificationType}</td>
                <td>
                    <a href="{path('app_admin_notification_template_show', {'id': notification_template.id})}">show</a>
                    <a href="{path('app_admin_notification_template_edit', {'id': notification_template.id})}">edit</a>
                </td>
            </tr>
        
) || (

            <tr>
                <td colspan="4">no records found</td>
            </tr>
        
))}
        </tbody>
    </table>

    <a href="{path('app_admin_notification_template_new')}">Create new</a>
{% endblock %}

    </>
  );
}
