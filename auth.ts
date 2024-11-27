import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/app/lib/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    verifyRequest: '/auth/verify-request',
  },
  adapter: PrismaAdapter(prisma),
  providers: [Google({authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code"
      }
    }}), Resend({from: "no-reply@skillwave.io"})],
})  