import prisma from "@/app/lib/prisma"
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_CONNECT_WEBHOOK_SECRET as string
    );
  } catch (error: unknown) {
    return new Response("webhook error", { status: 400 });
  }


  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      if (!session.metadata || !session.metadata.userId || !session.metadata.courseId) {
        console.error('Missing required metadata', session.metadata);
        return; // Exit if metadata is incomplete
      }

      const user = await prisma.user.findUnique({
        where: { id: session.metadata.userId },
        select: { purchasedCourses: true },
      });

      // Append the new courseId if it's not already in the array
      const updatedCourses = user?.purchasedCourses
        ? [...new Set([...user.purchasedCourses, session.metadata.courseId])]
        : [session.metadata.courseId];

      // Add the course to the user's purchased courses in the database
      await prisma.user.update({
        where: { id: session.metadata.userId },
        data: {
          purchasedCourses: updatedCourses,
        },
      });
      break;
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription;
      await prisma.subscription.upsert({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        create: {
          stripeSubscriptionId: subscription.id,
          userId: subscription.metadata.userId,
          status: subscription.status,
          priceId: subscription.items.data[0].price.id,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
        update: {
          status: subscription.status,
          priceId: subscription.items.data[0].price.id,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      });
      break;

    case 'customer.subscription.deleted':
      // TODO when a user cancels subscription, set all their courses to DRAFT
      const subscription1 = event.data.object as Stripe.Subscription;
      await prisma.subscription.delete({
        where: {
          stripeSubscriptionId: subscription1.id,
        },
      });
      break;
    
    default: {
      console.log("unhandled event");
    }
  }

  return new Response(null, { status: 200 });
}