import React from "react";
import ProfileCard from '@/app/ui/profile/profile-card'
import { Divider } from "@nextui-org/divider";
import CourseCard from '@/app/ui/profile/course-card'; // Assuming you have this component
interface Course {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  created?: boolean;
  purchased?: boolean;
}
export default function Profile() {
  // add ability to follow a user. add follow button somwhere on profile page
  const courses = [
    {
      id: 1,
      title: "Course 1",
      description: "Introduction to React.js",
      imageUrl: "https://nextui.org/images/card-example-2.jpeg",
      price: 47
    },
    {
      id: 2,
      title: "Course 2",
      description: "Advanced CSS Techniques",
      imageUrl: "https://nextui.org/images/hero-card-complete.jpeg",
      price: 78.99
    },
    {
      id: 3,
      title: "Course 3",
      description: "JavaScript Fundamentals",
      imageUrl: "https://nextui.org/images/card-example-1.jpeg",
      price: 55
    },
    {
      id: 4,
      title: "Course 4",
      description: "Mastering TypeScript",
      imageUrl: "https://nextui.org/images/hero-card-complete.jpeg",
      price: 65.50
    },
    {
      id: 5,
      title: "Course 5",
      description: "Understanding Node.js",
      imageUrl: "https://nextui.org/images/card-example-2.jpeg",
      price: 45
    },
    {
      id: 6,
      title: "Course 6",
      description: "Frontend Development Bootcamp",
      imageUrl: "https://nextui.org/images/hero-card-complete.jpeg",
      price: 99.99
    },
    {
      id: 7,
      title: "Course 7",
      description: "Backend Development with Express",
      imageUrl: "https://nextui.org/images/card-example-1.jpeg",
      price: 60
    },
    {
      id: 8,
      title: "Course 8",
      description: "Database Design and SQL",
      imageUrl: "https://nextui.org/images/card-example-2.jpeg",
      price: 72.30
    },
    {
      id: 9,
      title: "Course 9",
      description: "Building RESTful APIs",
      imageUrl: "https://nextui.org/images/hero-card-complete.jpeg",
      price: 85.75
    },
    {
      id: 10,
      title: "Course 10",
      description: "Web Development for Beginners",
      imageUrl: "https://nextui.org/images/card-example-1.jpeg",
      price: 40
    }
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-center">
        <ProfileCard />
      </div>
      <Divider className="w-full mt-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {courses.map(course => (
          <CourseCard
            title={course.title}
            description={course.description}
            imageUrl={course.imageUrl}
            price={course.price}
          />
        ))}
      </div>
    </div>
  );
}
