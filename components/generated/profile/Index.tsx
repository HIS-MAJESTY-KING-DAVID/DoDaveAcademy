import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{student is not same as null && (

    {% set baseTemplate = "student/base.html.twig" %}
{% elseif enseignant is not same as null %}
    {% set baseTemplate = "instructor/base.html.twig" %}

) || (

    {% set baseTemplate = "admin/base.html.twig" %}  

)}

{% extends baseTemplate %}

{% block pageContent %}
    {include('profile/_profile_content.html.twig')}
{% endblock %}



    </>
  );
}
