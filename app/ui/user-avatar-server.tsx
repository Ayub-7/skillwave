import React from 'react';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { getUser } from '@/app/lib/data';
import UserAvatarClient from '@/app/ui/user-avatar-client';

export default async function UserAvatarServer() {
  const secretKey = process.env.SESSION_KEY;
  const key = new TextEncoder().encode(secretKey);

  async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return JSON.stringify(payload);
  }

  async function getSession() {
    const session = cookies().get('session')?.value;
    if (!session) return null;
    return await decrypt(session) || '';
  }
  const session = await getSession() || '';
  const user = await getUser(JSON.parse(session).user.id)
  return <UserAvatarClient user={user} />;
}
