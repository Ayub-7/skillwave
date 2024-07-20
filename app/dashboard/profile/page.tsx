import React from "react";
import ProfileCard from '@/app/ui/profile/profile-card'
import { Divider } from "@nextui-org/divider";

export default function Profile() {
  return (
    // Under the divider add the courses, use nextui tabs to filter between 
    // ["All", "Created", "Purchased"]
    <div className="flex flex-col items-center">
      <div className="flex justify-center">
        <ProfileCard />
      </div>
      <Divider className="w-full mt-8" />
    </div>
  );
}
