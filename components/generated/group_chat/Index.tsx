import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Chat{% endblock %}

{% block body %}
<div className="container">
    <div className="row">
        <div className="col">
            <h1>Chat</h1>
            <p>Welcome to the chat interface. Choose a chat type:</p>
            <ul>
                <li><a href="{path('app_chat')}">Class Chat</a></li>
                <li><a href="{path('app_teacher_chat')}">Chat with Teachers</a></li>
            </ul>
        </div>
    </div>
</div>
{% endblock %}

    </>
  );
}
