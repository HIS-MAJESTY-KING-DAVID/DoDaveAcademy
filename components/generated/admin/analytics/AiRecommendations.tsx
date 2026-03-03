import React from 'react';
import Link from 'next/link';

export default function AiRecommendations(props: any) {
  return (
    <>
<!-- AI Recommendations START -->
<div className="row g-4 mb-4">
    <div className="col-12">
        <div className="card shadow h-100">
            <!-- Card header -->
            <div className="card-header border-bottom d-flex justify-content-between align-items-center p-4">
                <h5 className="card-header-title">AI Recommendations for Improvements</h5>
            </div>
            <!-- Card body START -->
            <div className="card-body p-4">
                <div className="row g-4">
                    {aiRecommendations.map(recommendation => (

                        <div className="col-md-6 col-lg-4">
                            <div className="card border h-100">
                                <!-- Card header -->
                                <div className="card-header border-bottom d-flex align-items-center">
                                    <div className="icon-md bg-success bg-opacity-10 rounded-circle text-success me-2">
                                        <i className="fas fa-lightbulb fa-fw"></i>
                                    </div>
                                    <h6 className="card-header-title mb-0">{recommendation.title}</h6>
                                </div>
                                <!-- Card body -->
                                <div className="card-body">
                                    <p className="mb-2">{recommendation.description}</p>
                                    <div className="d-flex align-items-center">
                                        <span className="badge rounded-pill 
                                            {recommendation.priority == 'High' && (

                                                bg-danger
                                            {% elseif recommendation.priority == 'Medium' %}
                                                bg-warning
                                            
) || (

                                                bg-info
                                            
)}
                                        ">Priority: {recommendation.priority}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
))}
                </div>
            </div>
            <!-- Card body END -->
        </div>
    </div>
</div>
<!-- AI Recommendations END -->

    </>
  );
}
