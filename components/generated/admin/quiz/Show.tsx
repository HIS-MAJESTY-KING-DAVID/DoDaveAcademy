import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Quiz{% endblock %}

{% block body %}
    <h1>Quiz</h1>

    <table className="table">
        <tbody>
            <tr>
                <th>Id</th>
                <td>{quiz.id}</td>
            </tr>
            <tr>
                <th>Question</th>
                <td>{quiz.question}</td>
            </tr>
            <tr>
                <th>Reference</th>
                <td>{quiz.reference}</td>
            </tr>
        </tbody>
    </table>

    <a href="{path('app_quiz_index')}">back to list</a>

    <a href="{path('app_quiz_edit', {'id': quiz.id})}">edit</a>

    {include('quiz/_delete_form.html.twig')}
{% endblock %}

    </>
  );
}
