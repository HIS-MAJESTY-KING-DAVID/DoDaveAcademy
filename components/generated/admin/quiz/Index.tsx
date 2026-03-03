import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}Quiz index{% endblock %}

{% block body %}
    <h1>Quiz index</h1>

    <table className="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Question</th>
                <th>Reference</th>
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
        {quizzes.map(quiz => (

            <tr>
                <td>{quiz.id}</td>
                <td>{quiz.question}</td>
                <td>{quiz.reference}</td>
                <td>
                    <a href="{path('app_quiz_show', {'id': quiz.id})}">show</a>
                    <a href="{path('app_quiz_edit', {'id': quiz.id})}">edit</a>
                </td>
            </tr>
        
) || (

            <tr>
                <td colspan="4">no records found</td>
            </tr>
        
))}
        </tbody>
    </table>

    <a href="{path('app_quiz_new')}">Create new</a>
{% endblock %}

    </>
  );
}
