import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import CourseCard, { Course as CourseType } from '@/components/courses/CourseCard';
import { redirect } from 'next/navigation';

// Helper to map Prisma course to Component course
const mapCourse = (course: any): CourseType => { // eslint-disable-line @typescript-eslint/no-explicit-any
  return {
    id: course.id.toString(),
    slug: course.slug,
    title: course.title,
    description: course.description,
    image: course.media?.imageFile ? `/assets/images/courses/${course.media.imageFile}` : '/assets/images/courses/4by3/08.jpg', // Fallback image
    level: course.skillLevel?.name || 'All Levels',
    duration: course.duration,
    lessons: course.numberOfLessons,
    rating: course.review || 0,
  };
};

export default async function StudentDashboard() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const student = await prisma.student.findUnique({
    where: { userId: session.userId },
  });

  if (!student) {
    return (
        <div className="container py-4">
            <h2 className="mb-4">My Learning</h2>
            <div className="alert alert-info">
                You are not enrolled in any courses yet.
            </div>
        </div>
    );
  }

  const enrollments = await prisma.studentCourse.findMany({
    where: { studentId: student.id },
    include: {
      course: {
        include: {
          media: true,
          skillLevel: true,
        }
      }
    }
  });

  const courses = enrollments.map(e => mapCourse(e.course));

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Learning</h2>
      <div className="row g-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div className="col-sm-6 col-xl-4" key={course.id}>
              <CourseCard course={course} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info">
                You haven&apos;t enrolled in any courses yet.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
