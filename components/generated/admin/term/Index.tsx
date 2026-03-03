import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Terms and Contditions{% endblock %}

{% block actionBtn %}
    <a href="{path('app_admin_term_new')}" className="btn btn-flat btn-primary mb-0">Create new term</a>
{% endblock %}

{% block script %}

{% endblock %}

{% block mainContent %}
    <div className="card bg-transparent border">
        <!-- Card body START -->
        <div className="card-body">
            <!-- Course table START -->
            <div className="table-responsive border-0 rounded-3">
                <!-- Table START -->
                <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>IsOnline</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {terms.map(term => (

                            <tr>
                                <td>{loop.index}</td>
                                <td>{term.title}</td>
                                <td>{term.content|raw|u.truncate(30)}</td>
                                <td>{term.isOnline ? 'Yes' : 'No'}</td>
                                <td>
                                    <a href="{path('app_admin_term_show', {'id': term.id})}">show</a>
                                    <a href="{path('app_admin_term_edit', {'id': term.id})}">edit</a>
                                </td>
                            </tr>
                        
) || (

                            <tr>
                                <td colspan="5">no records found</td>
                            </tr>
                        
))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
{% endblock %}

    </>
  );
}
