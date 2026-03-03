import React, { useState } from 'react';
import Link from 'next/link';

interface Person {
  avatarPath: string;
  nomComplet: string;
  telephone?: string;
}

interface User {
  email: string;
  personne: Person;
}

interface Student {
  utilisateur: User;
}

interface Review {
  id: number;
  rating: number;
  message: string;
  createdAt: string;
  eleve: Student;
}

interface Teacher {
  utilisateur: User;
}

interface Category {
  name: string;
}

interface Media {
  imageFile: string;
}

interface Course {
  id: number;
  intitule: string;
  slug: string;
  description: string;
  isPublished: boolean;
  isFree: boolean;
  montantAbonnement: number;
  createdAt: string;
  niveauDifficulte: string;
  numberOfLessons: number;
  language: string;
  review: number; // Average rating?
  reviews: Review[];
  eleves: Student[];
  media: Media;
  enseignant: Teacher;
  categorie: Category;
}

interface CourseDetailsProps {
  course: Course;
  isTeacher?: boolean;
}

export default function CourseDetails({ course, isTeacher }: CourseDetailsProps) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const getAssetPath = (path: string) => {
    return path.startsWith('http') ? path : `/assets/${path}`; // Simplified asset path logic
  };

  const truncate = (str: string, length: number) => {
    return str.length > length ? str.substring(0, length) + '...' : str;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB'); // d/m/Y
  };
  
  const formatDateTime = (dateString: string) => {
      // F jS \a\t g:ia -> e.g. January 1st at 1:30pm
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) + ' at ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<li key={i} className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>);
      } else {
        stars.push(<li key={i} className="list-inline-item me-0 small"><i className="far fa-star text-warning"></i></li>);
      }
    }
    return <ul className="list-inline mb-0">{stars}</ul>;
  };

  return (
    <>
      {/* Page main content START */}
      <div className="page-content-wrapper border-0">

        {/* Title */}
        <div className="row mb-3">
          <div className="col-12 d-sm-flex justify-content-between align-items-center">
            <h1 className="h3 mb-2 mb-sm-0">{course.intitule}</h1>
            {isTeacher && !course.isPublished && (
              <Link href={`/instructor/cours/${course.slug}/edit`} className="btn btn-primary mb-0">Edit Course</Link>
            )}
            <Link href={`/instructor/course-forum/${course.slug}`} className="btn btn btn-secondary mb-0">Course Forum</Link>
          </div>
        </div>
                
        <div className="row g-4">

          {/* Course information START */}
          <div className="col-xxl-6">
            <div className="card bg-transparent border rounded-3 h-100">

              {/* Card header */}
              <div className="card-header bg-light border-bottom">
                <h5 className="card-header-title">{course.intitule}</h5>
              </div>

              {/* Card body START */}
              <div className="card-body">

                {/* Course image and info START */}
                <div className="row g-4">
                  {/* Course image */}
                  <div className="col-md-6">
                    <img src={`/uploads/media/courses/${course.media.imageFile}`} className="rounded" alt="" />
                  </div>
                  {/* Course info and avatar */}
                  <div className="col-md-6">
                    {/* Info */}
                    <p className="mb-3">{truncate(course.description, 190)}</p>

                    {/* Price */}
                    <h5 className="mb-3">{course.isFree ? 'Free' : `${course.montantAbonnement} XAF`}</h5>
                    
                    {/* Avatar */}
                    <div className="d-sm-flex align-items-center">
                      {/* Avatar image */}
                      <div className="avatar avatar-md">
                        <img className="avatar-img rounded-circle" src={getAssetPath(course.enseignant.utilisateur.personne.avatarPath)} alt="avatar" />
                      </div>
                      <div className="ms-sm-3 mt-2 mt-sm-0">
                        <h6 className="mb-0"><a href="#">By {course.enseignant.utilisateur.personne.nomComplet}</a></h6>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Course image and info END */}

                {/* Information START */}
                <div className="row mt-3">

                  {/* Information item */}
                  <div className="col-md-6">
                    <ul className="list-group list-group-borderless">
                      <li className="list-group-item">
                        <span>release date:</span>
                        <span className="h6 mb-0 ms-1">{formatDate(course.createdAt)}</span>
                      </li>

                      <li className="list-group-item">
                        <span>Category:</span>
                        <span title={course.categorie.name} className="h6 mb-0 ms-1">{truncate(course.categorie.name, 13)}</span>
                      </li>

                      <li className="list-group-item">
                        <span>Total Enrolled:</span>
                        <span className="h6 mb-0 ms-1">{course.eleves.length}</span>
                      </li>

                      <li className="list-group-item">
                        <span>Premium:</span>
                        <span className="h6 mb-0 ms-1">{!course.isFree ? 'Yes' : 'No'}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Information item */}
                  <div className="col-md-6">
                    <ul className="list-group list-group-borderless">
                      <li className="list-group-item">
                        <span>Skills:</span>
                        <span className="h6 mb-0 ms-1">{course.niveauDifficulte}</span>
                      </li>

                      <li className="list-group-item">
                        <span>Total Lecture:</span>
                        <span className="h6 mb-0 ms-1">{course.numberOfLessons}</span>
                      </li>

                      <li className="list-group-item">
                        <span>Language:</span>
                        <span className="h6 mb-0 ms-1">{course.language}</span>
                      </li>

                      <li className="list-group-item">
                        <span>Review:</span>
                        <span className="h6 mb-0 ms-1">{course.review}<i className="fas fa-star text-warning ms-1"></i></span>
                      </li>
                      
                    </ul>
                  </div>
                </div>
                {/* Information END */}
              </div>
              {/* Card body END */}
            </div>
          </div>
          {/* Course information END */}

          {/* Chart START */}
          <div className="col-xxl-6">
            <div className="row g-4">

              {/* Active student START */}
              <div className="col-md-6 col-xxl-12">
                <div className="card bg-transparent border overflow-hidden">
                  {/* Card header */}
                  <div className="card-header bg-light border-bottom">
                    <h5 className="card-header-title mb-0">Total course earning</h5>
                  </div>
                  {/* Card body */}
                  <div className="card-body p-0">
                    <div className="d-sm-flex justify-content-between p-4">
                      <h4 className="text-blue mb-0">$12,586</h4>
                      <p className="mb-0"><span className="text-success me-1">0.20%<i className="bi bi-arrow-up"></i></span>vs last Week</p>
                    </div>
                    {/* Apex chart */}
                    <div id="activeChartstudent"></div>
                  </div>
                </div>
              </div>
              {/* Active student END */}

              {/* Enrolled START */}
              <div className="col-md-6 col-xxl-12">
                <div className="card bg-transparent border overflow-hidden">
                  {/* Card header */}
                  <div className="card-header bg-light border-bottom">
                    <h5 className="card-header-title mb-0">New Enrollment This Month</h5>
                  </div>
                  {/* Card body */}
                  <div className="card-body p-0">
                    <div className="d-sm-flex justify-content-between p-4">
                      <h4 className="text-blue mb-0">186</h4>
                      <p className="mb-0"><span className="text-success me-1">0.35%<i className="bi bi-arrow-up"></i></span>vs last Week</p>
                    </div>
                    {/* Apex chart */}
                    <div id="activeChartstudent2"></div>
                  </div>
                </div>
              </div>
              {/* Enrolled END */}

            </div>
          </div>
          {/* Chart END */}

          {/* Student list START */}
          <div className="col-12">
            <div className="card bg-transparent border">

              {/* Card header START */}
              <div className="card-header bg-light border-bottom">
                <h5 className="mb-0">Students List</h5>
              </div>
              {/* Card header END */}
  
              {/* Card body START */}
              <div className="card-body pb-0">
                {/* Table START */}
                <div className="table-responsive border-0">
                  <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                    {/* Table head */}
                    <thead>
                      <tr>
                        <th scope="col" className="border-0 rounded-start">Student Name</th>
                        <th scope="col" className="border-0">Email</th>
                        <th scope="col" className="border-0">Phone Number</th>
                        <th scope="col" className="border-0 rounded-end">Action</th>
                      </tr>
                    </thead>
  
                    {/* Table body START */}
                    <tbody>
                      {course.eleves && course.eleves.length > 0 ? (
                        course.eleves.map((eleve, index) => (
                          <tr key={index}>
                            {/* Table data */}
                            <td>
                              <div className="d-flex align-items-center position-relative">
                                {/* Image */}
                                <div className="avatar avatar-xs mb-2 mb-md-0">
                                  <img src={getAssetPath(eleve.utilisateur.personne.avatarPath)} className="rounded-circle" alt="" />
                                </div>
                                <div className="mb-0 ms-2">
                                  {/* Title */}
                                  <h6 className="mb-0"><a href="#" className="stretched-link">{truncate(eleve.utilisateur.personne.nomComplet, 30)}</a></h6>
                                </div>
                              </div>
                            </td>
    
                            {/* Table data */}
                            <td className="text-center text-sm-start">
                              <h6 className="mb-0">{eleve.utilisateur.email}</h6>
                            </td>
    
                            {/* Table data */}
                            <td>{eleve.utilisateur.personne.telephone}</td>
    
                            {/* Table data */}
                            <td>
                              {/* Actions if any */}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan={4}>Empty</td></tr>
                      )}
                    </tbody>
                    {/* Table body END */}
                  </table>
                </div>
                {/* Table END */}
              </div>
              {/* Card body END */}
            </div>
          </div>
          {/* Student list END */}

          {/* Student reviews START */}
          <div className="col-12">
            <div className="card bg-transparent border">

              {/* Card header START */}
              <div className="card-header bg-light border-bottom">
                <h5 className="mb-0">Students all Reviews</h5>
              </div>
              {/* Card header END */}
  
              {/* Card body START */}
              <div className="card-body pb-0">
                {/* Table START */}
                <div className="table-responsive border-0">
                  <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                    {/* Table head */}
                    <thead>
                      <tr>
                        <th scope="col" className="border-0 rounded-start">Student Name</th>
                        <th scope="col" className="border-0">Date</th>
                        <th scope="col" className="border-0">Rating</th>
                        <th scope="col" className="border-0 rounded-end">Action</th>
                      </tr>
                    </thead>
  
                    {/* Table body START */}
                    <tbody>
                      {course.reviews && course.reviews.length > 0 ? (
                        course.reviews.map((review) => (
                          <tr key={review.id}>
                            {/* Table data */}
                            <td>
                              <div className="d-flex align-items-center position-relative">
                                {/* Image */}
                                <div className="avatar avatar-xs mb-2 mb-md-0">
                                  <img src={getAssetPath(review.eleve.utilisateur.personne.avatarPath)} className="rounded-circle" alt="" />
                                </div>
                                <div className="mb-0 ms-2">
                                  {/* Title */}
                                  <h6 className="mb-0"><a href="#" className="stretched-link">{truncate(review.eleve.utilisateur.personne.nomComplet, 30)}</a></h6>
                                </div>
                              </div>
                            </td>
    
                            {/* Table data */}
                            <td className="text-center text-sm-start">
                              <h6 className="mb-0">{formatDateTime(review.createdAt)}</h6>
                            </td>
    
                            {/* Table data */}
                            <td>
                              {renderStars(review.rating)}
                            </td>
    
                            {/* Table data */}
                            <td>
                              <button 
                                className="btn btn-sm btn-info-soft mb-0 me-1" 
                                onClick={() => setSelectedReview(review)}
                                data-bs-toggle="modal" 
                                data-bs-target="#viewReviewModal"
                              >
                                View
                              </button>
                              <button 
                                className="btn btn-sm btn-danger-soft mb-0" 
                                onClick={() => {
                                  if (window.confirm('Are you sure you want to delete these review?')) {
                                    // Handle delete
                                    console.log('Delete review', review.id);
                                  }
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan={4}>Empty</td></tr>
                      )}
                    </tbody>
                    {/* Table body END */}
                  </table>
                </div>
                {/* Table END */}
              </div>
              {/* Card body END */}
            </div>
          </div>
          {/* Student reviews END */}

        </div> {/* Row END */}
      </div>
      {/* Page main content END */}

      {/* Popup modal for review START */}
      <div className="modal fade" id="viewReviewModal" tabIndex={-1} aria-labelledby="viewReviewLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* Modal header */}
            <div className="modal-header bg-dark">
              <h5 className="modal-title text-white" id="viewReviewLabel">Review</h5>
              <button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              {selectedReview && (
                <div className="d-md-flex">
                  {/* Avatar */}
                  <div className="avatar avatar-md me-4 flex-shrink-0">
                    <img className="avatar-img rounded-circle" src={getAssetPath(selectedReview.eleve.utilisateur.personne.avatarPath)} alt="avatar" />
                  </div>
                  {/* Text */}
                  <div>
                    <div className="d-sm-flex mt-1 mt-md-0 align-items-center">
                      <h5 className="me-3 mb-0">{selectedReview.eleve.utilisateur.personne.nomComplet}</h5>
                      {/* Review star */}
                      {renderStars(selectedReview.rating)}
                    </div>
                    {/* Info */}
                    <p className="small mb-2">{formatDateTime(selectedReview.createdAt)}</p>
                    <p className="mb-2">{selectedReview.message}</p>
                  </div>	
                </div>
              )}
            </div>
            {/* Modal footer */}
            <div className="modal-footer">
              <button type="button" className="btn btn-danger-soft my-0" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      {/* Popup modal for review END */}
    </>
  );
}
