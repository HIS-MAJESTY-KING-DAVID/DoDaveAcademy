import React from 'react';
import Link from 'next/link';

export default function InvitationUsedEmail(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}{'INVITATION_CODE_USED_TITLE_KEY'|trans}{% endblock %}

{% block body %}
<div className="container">
    <div style="margin: 20px auto; max-width: 600px; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #333; text-align: center; margin-bottom: 20px;">{'NEW_REGISTRATION_WITH_CODE_KEY'|trans}</h1>
        
        <p style="color: #666; font-size: 16px; line-height: 1.5;">
            {'HELLO_USER_KEY'|trans({'%user%': inviter.nomComplet})},
        </p>

        <p style="color: #666; font-size: 16px; line-height: 1.5;">
            {'REGISTRATION_NOTIFICATION_KEY'|trans({'%user%': invited.nomComplet})}
        </p>

        <p style="color: #666; font-size: 16px; line-height: 1.5;">
            {'VIEW_IN_DASHBOARD_KEY'|trans}
        </p>

        <div style="margin: 30px 0; text-align: center;">
            <a href="{url('app_login')}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                {'ACCESS_MY_ACCOUNT_KEY'|trans}
            </a>
        </div>

        <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px;">
            {'THANKS_USING_PLATFORM_KEY'|trans}
        </p>
    </div>
</div>
{% endblock %}

    </>
  );
}
