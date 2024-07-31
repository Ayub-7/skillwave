import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';
import {prisma} from "@/app/lib/prisma"

async function getUser(email: string){
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    });
    const hashedPassword = await bcrypt.hash("password", 10);
    const passwordsMatch = await bcrypt.compare("password", hashedPassword);
    console.log(passwordsMatch, 'ppo', hashedPassword)
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

const secretKey = process.env.SESSION_KEY;
const key = new TextEncoder().encode(secretKey);

async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 day')
    .sign(key);
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          console.log(user, 'hii')
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log('okn', passwordsMatch)

          if (passwordsMatch) {
            const expires = Date.now() + 24 * 60 * 60 * 1000;
            const session = await encrypt({ user, expires });
            cookies().set('session', session, { expires, httpOnly: true });
            return user;
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
