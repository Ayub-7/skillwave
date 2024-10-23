import React from "react";
import { getSession, getUser, getPurchasedCourses, getUserDetails } from "@/app/lib/data";
import ProfileCard from '@/app/ui/profile/profile-card'
import CourseCard from "@/app/ui/profile/course-card";
import CourseTabSwitcher from '@/app/ui/profile/course-tab-switcher'
import { Divider } from "@nextui-org/divider";
import { notFound } from 'next/navigation';
import { auth } from "@/auth"

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  const id = params.id;
  const userProfile = await getUser(id);
  if (!userProfile) {
    notFound();
  }

  const userId = session?.user?.id
  const user = await getUserDetails(userId)

  const isOwnProfile = userId === id;

  let purchasedCourses;
  if (isOwnProfile) {
    purchasedCourses = await getPurchasedCourses(user)
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-center">
        <ProfileCard canEdit={isOwnProfile} user={userProfile} />
      </div>
      <Divider className="w-full mt-8" />
      <div>
        {isOwnProfile ? (
          <CourseTabSwitcher myCourses={userProfile?.courses} purchasedCourses={purchasedCourses} currUserId={user?.id} />
        ) :
          <div className="flex justify-center mt-16 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {userProfile.courses.map((course: any) => (
                course.status === 'PUBLISHED' && (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    course={course}
                  />
                )
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
}
