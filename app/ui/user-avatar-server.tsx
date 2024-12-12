import React from 'react';
import { Link } from "@nextui-org/link";
import UserAvatarClient from '@/app/ui/user-avatar-client';
import { Button } from "@nextui-org/button"
import { auth } from "@/auth"
import { LogInIcon } from 'lucide-react';

export default async function UserAvatarServer() {
  const session = await auth()

  if (!session || !session.user) {
    return (
      <Link href="/login">
        <Button radius='sm' color="primary" variant="solid">
          Sign in<LogInIcon />
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