import { getAllCourses } from "@/app/lib/data";
import CourseCard from "@/app/ui/profile/course-card";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';


export default async function Page() {
  const courses = await getAllCourses()
  return (
    <main>
      <div className="flex justify-center pt-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Courses..."
            className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
      <div className="flex justify-center mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {courses.map((course: any) => (
            <CourseCard
              key={course.id}
              id={course.id}
              course={course}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
