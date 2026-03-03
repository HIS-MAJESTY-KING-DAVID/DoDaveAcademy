import React from 'react';
import Link from 'next/link';

export default function New(props: any) {
  return (
    <>
<!DOCTYPE html>

<title>New NotificationTemplate</title>

{% block body %}
    <h1>Create new NotificationTemplate</h1>

    {include('admin/notification_template/_form.html.twig')}

    <a href="{path('app_admin_notification_template_index')}">back to list</a>
{% endblock %}

    </>
  );
}
