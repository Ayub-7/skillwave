import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/app/lib/prisma"
import { stripe } from "@/app/lib/stripe"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ account, profile }) {
      let dbUser = await prisma.user.findUnique({
        where: {
          id: account?.userId,
        },
      });

      if (!dbUser) {
        const stripeAccount = await stripe.accounts.create({
          email: profile?.email as string,
          controller: {
            losses: {
              payments: "application",
            },
            fees: {
              payer: "application",
            },
            stripe_dashboard: {
              type: "express",
            },
          },
        });
        await prisma.user.update({
          where: {
            id: account?.userId
          },
          data: {
            connectedAccountId: stripeAccount.id,
          },
        });
      }
      return true
    },
  },
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