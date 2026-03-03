import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Lesson index{% endblock %}

{% block body %}
    <h1>Lesson index</h1>

    <table className="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Objectifs</th>
                <th>Content</th>
                <th>Type</th>
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
        {lessons.map(lesson => (

            <tr>
                <td>{lesson.id}</td>
                <td>{lesson.title}</td>
                <td>{lesson.slug}</td>
                <td>{lesson.objectifs}</td>
                <td>{lesson.content}</td>
                <td>{lesson.type}</td>
                <td>
                    <a href="{path('app_lesson_show', {'id': lesson.id})}">show</a>
                    <a href="{path('app_lesson_edit', {'id': lesson.id})}">edit</a>
                </td>
            </tr>
        
) || (

            <tr>
                <td colspan="7">no records found</td>
            </tr>
        
))}
        </tbody>
    </table>

    <a href="{path('app_lesson_new')}">Create new</a>
{% endblock %}

    </>
  );
}
