import React from 'react';
import UserAvatarClient from '@/app/ui/user-avatar-client';
import { auth } from "@/auth"
import SigninDropDown from "@/app/ui/signinDropdown"

export default async function UserAvatarServer() {
  const session = await auth()

  if (!session || !session.user) {
    return (
      <SigninDropDown />
    );
  }

  return (
    <UserAvatarClient
      image={session.user.image}
      name={session.user.name}
      id={session.user.id}
    />
  );
}