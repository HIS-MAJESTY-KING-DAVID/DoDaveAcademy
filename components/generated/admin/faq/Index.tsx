import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
<!DOCTYPE html>

<title>FAQ index</title>

{% block body %}
    <h1>FAQ index</h1>

    <table className="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Question</th>
                <th>Answer</th>
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
        {f_a_qs.map(f_a_q => (

            <tr>
                <td>{f_a_q.id}</td>
                <td>{f_a_q.question}</td>
                <td>{f_a_q.answer}</td>
                <td>
                    <a href="{path('app_f_a_q_show', {'id': f_a_q.id})}">show</a>
                    <a href="{path('app_f_a_q_edit', {'id': f_a_q.id})}">edit</a>
                </td>
            </tr>
        
) || (

            <tr>
                <td colspan="4">no records found</td>
            </tr>
        
))}
        </tbody>
    </table>

    <a href="{path('app_f_a_q_new')}">Create new</a>
{% endblock %}

    </>
  );
}
