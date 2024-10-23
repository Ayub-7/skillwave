import React from 'react';
import { auth } from "@/auth"
import UserAvatarClient from '@/app/ui/user-avatar-client';

export default async function UserAvatarServer() {
  const session = await auth();
  return <UserAvatarClient image={session?.user?.image} name={session?.user?.name} id={session?.user?.id} />;
}
