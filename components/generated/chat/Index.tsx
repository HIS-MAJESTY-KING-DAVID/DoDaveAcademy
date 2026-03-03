import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'student/base.html.twig' %}

{% block subTitle %}Chat{% endblock %}

{% block stylesheets %}
    {parent()}
    {encore_entry_link_tags('chat_styles')}
{% endblock %}

{% block studentContent %}
    {% block instructorBanner %}{% endblock %}
    
    <section className="pt-0">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div id="react-chat" 
                         data-websocket-url="{websocket_url}"
                         data-token="{token}"
                         data-subjects="{subjects|json_encode|e('html_attr')}"
                         data-messages="{messages|json_encode|e('html_attr')}">
                    </div>
                </div>
            </div>
        </div>
    </section>
{% endblock %}

{% block javascripts %}
    {parent()}
    {encore_entry_script_tags('chat')}
{% endblock %}

    </>
  );
}
