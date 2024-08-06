import React from "react";
import { getSession, getUser, getPurchasedCourses } from "@/app/lib/data";
import ProfileCard from '@/app/ui/profile/profile-card'
import CourseTabSwitcher from '@/app/ui/profile/course-tab-switcher'
import { Divider } from "@nextui-org/divider";

export default async function Profile() {
  const session = await getSession() || '';
  const JsonSession = JSON.parse(session);
  const user = await getUser(JsonSession.user.id)
  const purchasedCourses = await getPurchasedCourses(user)

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-center">
        <ProfileCard />
      </div>
      <Divider className="w-full mt-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        <CourseTabSwitcher myCourses={user?.courses} purchasedCourses={purchasedCourses} />
      </div>
    </div>
  );
}
