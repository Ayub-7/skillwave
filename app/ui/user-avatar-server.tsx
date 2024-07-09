import React from 'react';
import UserAvatarClient from '@/app/ui/user-avatar-client';
import { getSession } from '@/app/lib/actions';

export default async function UserAvatarServer() {
  const session = await getSession() || '';
  return <UserAvatarClient session={session} />;
}
