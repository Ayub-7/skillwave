import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/app/lib/prisma"
import { createStripeAccount } from "@/app/lib/actions"

const handleLogin = async ({ user, account }: { user: any; account: any }) => {
  if (user && account) {
    try {
      await createStripeAccount(user.id as string);
    } catch (error) {
      console.error("Error processing login:", error);
      return false; // Prevent login if server action fails
    }
  }
  return true;
};
 
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
  callbacks: {
    async signIn(args) {
      return handleLogin(args)
    }
  }
})  