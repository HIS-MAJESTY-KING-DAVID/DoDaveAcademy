import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Push Notification{% endblock %}

{% block actionBtn %}
    <a href="{path('app_push_notification_index')}"  className="btn btn-sm btn-secondary mb-0">back to list</a>
{% endblock %}

    
{% block mainContent %}

    <table className="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Body</th>
                <th>CreateAt</th>
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
        {push_notifications.map(push_notification => (

            <tr>
                <td>{push_notification.id}</td>
                <td>{push_notification.title}</td>
                <td>{push_notification.body|raw}</td>
                <td>{push_notification.createAt ? push_notification.createAt|date('Y-m-d H:i:s') : ''}</td>
                <td>
                    <a href="{path('app_push_notification_show', {'id': push_notification.id})}">show</a>
                    <a href="{path('app_push_notification_edit', {'id': push_notification.id})}">edit</a>
                </td>
            </tr>
        
) || (

            <tr>
                <td colspan="5">no records found</td>
            </tr>
        
))}
        </tbody>
    </table>

    <a href="{path('app_push_notification_new')}">Create new</a>
{% endblock %}

    </>
  );
}
