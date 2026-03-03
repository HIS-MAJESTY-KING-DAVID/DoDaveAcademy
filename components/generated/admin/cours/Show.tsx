import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}


{% block mainPageContent %}
	{% include "includes/_course_details.html.twig" %}
{% endblock %}
    </>
  );
}
