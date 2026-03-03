import React from 'react';
import Link from 'next/link';

export default function Subject(props: any) {
  return (
    <>
{% extends "admin/base.html.twig" %}

{% block pageTitle %}Subject Analytics: {subject.name}{% endblock %}

{% block actionBtn %}
    <a href="{path('app_admin_message_analytics')}" className="btn btn-sm btn-primary mb-0"><i className="fas fa-arrow-left me-2"></i>Back to Analytics</a>
{% endblock %}

{% block mainContent %}
    <!-- Counter boxes START -->
    <div className="row g-4 mb-4">
        <!-- Counter item -->
        <div className="col-md-4 col-xxl-4">
            <div className="card card-body bg-primary bg-opacity-10 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center">
                    <!-- Digit -->
                    <div>
                        <h2 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="{messageStats.totalMessages}" data-purecounter-delay="200">0</h2>
                        <span className="mb-0 h6 fw-light">Total Messages</span>
                    </div>
                    <!-- Icon -->
                    <div className="icon-lg rounded-circle bg-primary text-white mb-0"><i className="fas fa-comment-dots fa-fw"></i></div>
                </div>
            </div>
        </div>

        <!-- Counter item -->
        <div className="col-md-4 col-xxl-4">
            <div className="card card-body bg-success bg-opacity-10 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center">
                    <!-- Digit -->
                    <div>
                        <h2 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="{messageStats.uniqueStudents}" data-purecounter-delay="200">0</h2>
                        <span className="mb-0 h6 fw-light">Unique Students</span>
                    </div>
                    <!-- Icon -->
                    <div className="icon-lg rounded-circle bg-success text-white mb-0"><i className="fas fa-user-graduate fa-fw"></i></div>
                </div>
            </div>
        </div>

        <!-- Counter item -->
        <div className="col-md-4 col-xxl-4">
            <div className="card card-body bg-warning bg-opacity-10 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center">
                    <!-- Digit -->
                    <div>
                        <h2 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="{messageStats.averageLength}" data-purecounter-delay="200">0</h2>
                        <span className="mb-0 h6 fw-light">Avg. Message Length</span>
                    </div>
                    <!-- Icon -->
                    <div className="icon-lg rounded-circle bg-warning text-white mb-0"><i className="fas fa-text-height fa-fw"></i></div>
                </div>
            </div>
        </div>
    </div>
    <!-- Counter boxes END -->

    <!-- Message categories and word cloud START -->
    <div className="row g-4 mb-4">
        <!-- Message categories START -->
        <div className="col-lg-6 col-xl-6">
            <div className="card shadow h-100">
                <!-- Card header -->
                <div className="card-header border-bottom d-flex justify-content-between align-items-center p-4">
                    <h5 className="card-header-title">Message Categories</h5>
                </div>
                <!-- Card body START -->
                <div className="card-body p-4">
                    <div id="subjectCategoriesChart" data-categories="{messageCategories}"></div>
                </div>
                <!-- Card body END -->
            </div>
        </div>
        <!-- Message categories END -->

        <!-- Word cloud START -->
        <div className="col-lg-6 col-xl-6">
            <div className="card shadow h-100">
                <!-- Card header -->
                <div className="card-header border-bottom d-flex justify-content-between align-items-center p-4">
                    <h5 className="card-header-title">Common Terms</h5>
                </div>
                <!-- Card body START -->
                <div className="card-body p-4">
                    <div id="subjectWordCloudContainer" data-terms="{commonTerms}" style="height: 300px;"></div>
                </div>
                <!-- Card body END -->
            </div>
        </div>
        <!-- Word cloud END -->
    </div>
    <!-- Message categories and word cloud END -->
{% endblock %}

{% block javascripts %}
    {parent()}
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script src="https://cdn.jsdelivr.net/npm/jqcloud2@2.0.3/dist/jqcloud.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jqcloud2@2.0.3/dist/jqcloud.min.css">
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Message Categories Chart
            const categoriesElement = document.getElementById('subjectCategoriesChart');
            const categories_data = JSON.parse(categoriesElement.getAttribute('data-categories'));
            
            const labels = categories_data.map(item => item.category);
            const values = categories_data.map(item => item.count);
            
            const messageCategoriesOptions = {
                series: values,
                chart: {
                    width: '100%',
                    type: 'pie',
                },
                labels: labels,
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 300
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }],
                colors: ['#4361ee', '#25d366', '#ea4c89', '#f7b733', '#3498db', '#e74c3c', '#9b59b6', '#1abc9c', '#f39c12', '#95a5a6']
            };
            
            new ApexCharts(categoriesElement, messageCategoriesOptions).render();
            
            // Word Cloud
            const wordCloudElement = document.getElementById('subjectWordCloudContainer');
            const terms = JSON.parse(wordCloudElement.getAttribute('data-terms'));
            
            $(wordCloudElement).jQCloud(terms, {
                width: wordCloudElement.offsetWidth,
                height: 300,
                colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
                fontSize: {
                    from: 0.1,
                    to: 0.02
                }
            });
        });
    </script>
{% endblock %}

    </>
  );
}
