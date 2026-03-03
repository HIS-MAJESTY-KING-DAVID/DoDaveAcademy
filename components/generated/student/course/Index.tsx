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
    <div className="card bg-transparent border rounded-3">
      {/* Card header START */}
      <div className="card-header bg-transparent border-bottom">
        <h3 className="mb-0">Mes Cours</h3>
      </div>
      {/* Card header END */}

      {/* Card body START */}
      <div className="card-body">

        {/* Search and select START */}
        <div className="row g-3 align-items-center justify-content-between mb-4">
          <div className="col-md-3">
            
          </div>
        </div>
        {/* Search and select END */}

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
                            {/* Title */}
                            <h6 className="mb-2">{course.intitule}</h6>
                            {/* Info */}
                            <div className="overflow-hidden">
                              <h6 className="mb-0 text-end">{percent.toFixed(0)}%</h6>
                              <div className="progress progress-sm bg-primary bg-opacity-10">
                                <div 
                                  className="progress-bar bg-primary aos" 
                                  role="progressbar" 
                                  data-aos="slide-right" 
                                  data-aos-delay="200" 
                                  data-aos-duration="1000" 
                                  data-aos-easing="ease-in-out" 
                                  style={{ width: `${percent}%` }} 
                                  aria-valuenow={percent} 
                                  aria-valuemin={0} 
                                  aria-valuemax={100}
                                >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </td>

                    {/* Table data */}
                    <td>{course.numberOfLessons}</td>

                    {/* Table data */}
                    <td>{finishedCount}</td>

                    {/* Table data */}
                    <td>
                      <Link href={`/course/${course.slug}`} className="btn btn-primary-soft btn-sm">
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
  );
}
