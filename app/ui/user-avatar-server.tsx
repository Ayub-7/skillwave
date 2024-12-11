import React from 'react';
import { Link } from "@nextui-org/link";
import UserAvatarClient from '@/app/ui/user-avatar-client';
import { Button } from "@nextui-org/button"
import { auth } from "@/auth"

export default async function UserAvatarServer() {
  const session = await auth()

  if (!session || !session.user) {
    return (
      <Link href="/login">
        <Button color="primary" variant="solid">
          Login
        </Button>
      </Link>
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