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

  // Define subscription outside the switch statement
  const subscription = event.data.object as Stripe.Subscription;

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
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
      await prisma.subscription.delete({
        where: {
          stripeSubscriptionId: subscription.id,
        },
      });
      break;
    
    default: {
      console.log("unhandled event");
    }
  }

  return new Response(null, { status: 200 });
}