import React from 'react';
import Link from 'next/link';

interface Course {
  id: number;
  slug: string;
  intitule: string;
  media: {
    imageFile: string;
  };
  numberOfLessons: number;
}

interface Lecture {
  isFinished: boolean;
  lesson?: {
    chapitre?: {
      cours?: Course;
    };
  };
}

interface Student {
  cours: Course[];
  lectures: Lecture[];
}

interface IndexProps {
  student: Student;
}

export default function Index({ student }: IndexProps) {
  const getFinishedLessonsCount = (course: Course) => {
    if (!student.lectures) return 0;
    return student.lectures.filter(l => 
      l.isFinished && l.lesson?.chapitre?.cours?.id === course.id
    ).length;
  };

  const getProgress = (course: Course) => {
    const finished = getFinishedLessonsCount(course);
    const total = course.numberOfLessons > 0 ? course.numberOfLessons : 1;
    return (finished * 100) / total;
  };

  return (
    <>
      {/* Counter boxes START */}
      <div className="row mb-4 counter-box d-none d-md-flex">
        {/* Counter item */}
        <div className="col-sm-6 col-lg-4 mb-3 mb-lg-0">
          <div className="d-flex justify-content-center align-items-center p-4 bg-orange bg-opacity-15 rounded-3">
            <span className="display-6 lh-1 text-orange mb-0"><i className="fas fa-tv fa-fw"></i></span>
            <div className="ms-4">
              <div className="d-flex">
                <h5 className="purecounter mb-0 fw-bold">
                  {student?.cours?.length || 0}
                </h5>
              </div>
              <p className="mb-0 h6 fw-light">Total Courses</p>
            </div>
          </div>
        </div>
        {/* Counter item */}
        <div className="col-sm-6 col-lg-4 mb-3 mb-lg-0">
          <div className="d-flex justify-content-center align-items-center p-4 bg-purple bg-opacity-15 rounded-3">
            <span className="display-6 lh-1 text-purple mb-0"><i className="fas fa-clipboard-check fa-fw"></i></span>
            <div className="ms-4">
              <div className="d-flex">
                <h5 className="purecounter mb-0 fw-bold">
                  {student?.lectures?.length || 0}
                </h5>
              </div>
              <p className="mb-0 h6 fw-light">Complete lessons</p>
            </div>
          </div>
        </div>
        {/* Counter item */}
        <div className="col-sm-6 col-lg-4 mb-3 mb-lg-0">
          <div className="d-flex justify-content-center align-items-center p-4 bg-success bg-opacity-10 rounded-3">
            <span className="display-6 lh-1 text-success mb-0"><i className="fas fa-medal fa-fw"></i></span>
            <div className="ms-4">
              <div className="d-flex">
                <h5 className="purecounter mb-0 fw-bold">
                  8
                </h5>
              </div>
              <p className="mb-0 h6 fw-light">Achieved Certificates</p>
            </div>
          </div>
        </div>
      </div>
      {/* Counter boxes END */}

      <div className="card bg-transparent border rounded-3">
        {/* Card header START */}
        <div className="card-header bg-transparent border-bottom">
          <h3 className="mb-0">My Courses</h3>
        </div>
        {/* Card header END */}

        {/* Card body START */}
        <div className="card-body">

          {/* Course list table START */}
          <div className="table-responsive border-0">
            <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
              {/* Table head */}
              <thead>
                <tr>
                  <th scope="col" className="border-0 rounded-start">Titre</th>
                  <th scope="col" className="border-0">Nombre de leçon</th>
                  <th scope="col" className="border-0">Leçons complètes</th>
                  <th scope="col" className="border-0 rounded-end">Action</th>
                </tr>
              </thead>

              {/* Table body START */}
              <tbody>
                {student?.cours?.map((course) => {
                  const finishedCount = getFinishedLessonsCount(course);
                  const percent = getProgress(course);
                  
                  return (
                    <tr key={course.id}>
                      {/* Table data */}
                      <td>
                        <Link href={`/course/${course.slug}`} className="text-decoration-none text-dark">
                          <div className="d-flex align-items-center">
                            {/* Image */}
                            <div className="w-100px">
                              <img 
                                src={`/uploads/media/courses/${course.media.imageFile}`} 
                                className="rounded" 
                                alt="" 
                              />
                            </div>
                            <div className="mb-0 ms-2">
                              <h6 className="mb-0">{course.intitule}</h6>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td>{course.numberOfLessons}</td>
                      <td>{finishedCount}</td>
                      <td>
                        <Link href={`/course/${course.slug}`} className="btn btn-sm btn-primary-soft me-1 mb-1 mb-md-0">
                          Continue
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
