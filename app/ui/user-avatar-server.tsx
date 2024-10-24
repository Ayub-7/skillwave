import React from 'react';
import { Link } from "@nextui-org/link";
import UserAvatarClient from '@/app/ui/user-avatar-client';
import { auth } from "@/auth"

export default async function UserAvatarServer() {
  const session = await auth()
  if (!session) return <Link href="/login">
    <button className="px-4 py-2 rounded bg-blue-500 text-white">
      Login/Signup
    </button>
  </Link>
  return <UserAvatarClient image={session?.user?.image} name={session?.user?.name} id={session?.user?.id} />;
}
