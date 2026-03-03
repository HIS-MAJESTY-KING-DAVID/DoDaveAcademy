import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
<!DOCTYPE html>

<title>Lesson index</title>

{% block body %}
    <h1>Lesson index</h1>

    <table className="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Content</th>
                <th>VideoLink</th>
                <th>Numero</th>
                <th>Poster</th>
                <th>UpdatedAt</th>
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
        {lessons.map(lesson => (

            <tr>
                <td>{lesson.id}</td>
                <td>{lesson.title}</td>
                <td>{lesson.slug}</td>
                <td>{lesson.content}</td>
                <td>{lesson.videoLink}</td>
                <td>{lesson.numero}</td>
                <td>{lesson.poster}</td>
                <td>{lesson.updatedAt ? lesson.updatedAt|date('Y-m-d H:i:s') : ''}</td>
                <td>
                    <a href="{path('app_lesson_show', {'id': lesson.id})}">show</a>
                    <a href="{path('app_lesson_edit', {'id': lesson.id})}">edit</a>
                </td>
            </tr>
        
) || (

            <tr>
                <td colspan="9">no records found</td>
            </tr>
        
))}
        </tbody>
    </table>

    <a href="{path('app_lesson_new')}">Create new</a>
{% endblock %}

    </>
  );
}
