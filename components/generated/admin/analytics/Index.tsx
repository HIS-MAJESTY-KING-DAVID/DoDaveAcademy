import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends "admin/base.html.twig" %}

{% block pageTitle %}Student Message Analytics{% endblock %}

{% block mainContent %}
    <!-- Counter boxes START -->
    <div className="row g-4 mb-4">
        <!-- Counter item -->
        <div className="col-md-6 col-xxl-6">
            <div className="card card-body bg-primary bg-opacity-10 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center">
                    <!-- Digit -->
                    <div>
                        <h2 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="{totalMessages}" data-purecounter-delay="200">0</h2>
                        <span className="mb-0 h6 fw-light">Total Student Messages</span>
                    </div>
                    <!-- Icon -->
                    <div className="icon-lg rounded-circle bg-primary text-white mb-0"><i className="fas fa-comment-dots fa-fw"></i></div>
                </div>
            </div>
        </div>

        <!-- Counter item -->
        <div className="col-md-6 col-xxl-6">
            <div className="card card-body bg-success bg-opacity-10 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center">
                    <!-- Digit -->
                    <div>
                        <h2 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="{totalStudentsWithMessages}" data-purecounter-delay="200">0</h2>
                        <span className="mb-0 h6 fw-light">Students Using Chat</span>
                    </div>
                    <!-- Icon -->
                    <div className="icon-lg rounded-circle bg-success text-white mb-0"><i className="fas fa-user-graduate fa-fw"></i></div>
                </div>
            </div>
        </div>
    </div>
    <!-- Counter boxes END -->

    <!-- Chart and top subjects START -->
    <div className="row g-4 mb-4">
        <!-- Chart START -->
        <div className="col-lg-8 col-xl-8">
            <div className="card shadow h-100">
                <!-- Card header -->
                <div className="card-header p-4 border-bottom">
                    <h5 className="card-header-title">Message Volume Trends</h5>
                </div>

                <!-- Card body -->
                <div className="card-body">
                    <!-- Apex chart -->
                    <div id="messageVolumeChart" data-message-trends="{messageTrends}"></div>
                </div>
            </div>
        </div>
        <!-- Chart END -->

        <!-- Top subjects START -->
        <div className="col-lg-4 col-xl-4">
            <div className="card shadow h-100">
                <!-- Card header -->
                <div className="card-header border-bottom d-flex justify-content-between align-items-center p-4">
                    <h5 className="card-header-title">Most Active Subjects</h5>
                </div>

                <!-- Card body START -->
                <div className="card-body p-4">
                    {topSubjects.map(subject => (

                        <!-- Subject item START -->
                        <div className="d-flex justify-content-between align-items-center">
                            <!-- Info -->
                            <div className="d-sm-flex align-items-center mb-1 mb-sm-0">
                                <div className="icon-md bg-orange bg-opacity-10 rounded-circle text-orange">
                                    <i className="fas fa-book fa-fw"></i>
                                </div>
                                <div className="ms-3">
                                    <h6 className="mb-0">{subject.name}</h6>
                                    <span className="small">{subject.messageCount} messages</span>
                                </div>
                            </div>
                            <!-- Button -->
                            <a href="{path('app_admin_subject_analytics', {id: subject.id})}" className="btn btn-sm btn-light mb-0">View</a>
                        </div>
                        <!-- Subject item END -->
                        {not loop.last && (

                            <hr /><!-- Divider -->
                        
)}
                    
))}
                </div>
                <!-- Card body END -->
            </div>
        </div>
        <!-- Top subjects END -->
    </div>
    <!-- Chart and top subjects END -->

    <!-- Message categories and top students START -->
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
                    <div id="messageCategoriesChart" data-categories="{messageCategories}"></div>
                </div>
                <!-- Card body END -->
            </div>
        </div>
        <!-- Message categories END -->

        <!-- Top students START -->
        <div className="col-lg-6 col-xl-6">
            <div className="card shadow h-100">
                <!-- Card header -->
                <div className="card-header border-bottom d-flex justify-content-between align-items-center p-4">
                    <h5 className="card-header-title">Most Active Students</h5>
                </div>
                <!-- Card body START -->
                <div className="card-body p-4">
                    {topStudents.map(student => (

                        <!-- Student item START -->
                        <div className="d-flex justify-content-between align-items-center">
                            <!-- Info -->
                            <div className="d-sm-flex align-items-center mb-1 mb-sm-0">
                                <div className="icon-md bg-purple bg-opacity-10 rounded-circle text-purple">
                                    <i className="fas fa-user-graduate fa-fw"></i>
                                </div>
                                <div className="ms-3">
                                    <h6 className="mb-0">{student.name}</h6>
                                    <span className="small">{student.messageCount} messages</span>
                                </div>
                            </div>
                        </div>
                        <!-- Student item END -->
                        {not loop.last && (

                            <hr /><!-- Divider -->
                        
)}
                    
))}
                </div>
                <!-- Card body END -->
            </div>
        </div>
        <!-- Top students END -->
    </div>
    <!-- Message categories and top students END -->

    <!-- Common terms START -->
    <div className="row g-4 mb-4">
        <div className="col-12">
            <div className="card shadow h-100">
                <!-- Card header -->
                <div className="card-header border-bottom d-flex justify-content-between align-items-center p-4">
                    <h5 className="card-header-title">Common Terms in Student Messages</h5>
                </div>
                <!-- Card body START -->
                <div className="card-body p-4">
                    <div id="wordCloudContainer" data-terms="{commonTerms}" style="height: 400px;"></div>
                </div>
                <!-- Card body END -->
            </div>
        </div>
    </div>
    <!-- Common terms END -->

    {% include 'admin/analytics/ai_recommendations.html.twig' %}
{% endblock %}

{% block javascripts %}
    {parent()}
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script src="https://cdn.jsdelivr.net/npm/jqcloud2@2.0.3/dist/jqcloud.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jqcloud2@2.0.3/dist/jqcloud.min.css">
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Message Volume Chart
            const messageTrendsElement = document.getElementById('messageVolumeChart');
            const messageTrends = JSON.parse(messageTrendsElement.getAttribute('data-message-trends'));
            
            const categories = messageTrends.map(item => item.date);
            const data = messageTrends.map(item => item.count);
            
            const messageVolumeOptions = {
                series: [{
                    name: 'Messages',
                    data: data
                }],
                chart: {
                    height: 350,
                    type: 'area',
                    toolbar: {
                        show: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: categories
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy'
                    },
                },
                colors: ['#4361ee']
            };
            
            new ApexCharts(messageTrendsElement, messageVolumeOptions).render();
            
            // Message Categories Chart
            const categoriesElement = document.getElementById('messageCategoriesChart');
            const categories_data = JSON.parse(categoriesElement.getAttribute('data-categories'));
            
            const labels = categories_data.map(item => item.name);
            const values = categories_data.map(item => item.value);
            
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
            const wordCloudElement = document.getElementById('wordCloudContainer');
            const terms = JSON.parse(wordCloudElement.getAttribute('data-terms'));
            
            $(wordCloudElement).jQCloud(terms, {
                width: wordCloudElement.offsetWidth,
                height: 400,
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
