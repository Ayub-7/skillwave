'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { stripe } from "@/app/lib/stripe";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import prisma from "@/app/lib/prisma"
import { z } from 'zod';
import { auth } from "@/auth"
import Stripe from 'stripe';

type InvoiceFormData = {
  customerId: string;
  amount: string;
  status: string;
};
type LoginFormData = {
  email: string;
  password: string;
};

interface UpdateUserInput {
  id: string; // Assuming you use an ID to identify the user
  name: string;
  bio?: string;
  twitter?: string
  instagram?: string; // Optional field
  linkedin?: string; // Optional field
  facebook?: string; // Optional field
  tiktok?: string; // Optional field
  youtube?: string; // Optional field
  image?: string;
}

interface courseInput {
  name: string;
  description?: string;
  authorId: string;
  price: number;
  imageUrl?: string;
}

export async function updateUser(input: UpdateUserInput) {
  const session = await auth();
  const { id, name, bio, twitter, instagram, linkedin, facebook, tiktok, youtube, image } = input;
  if (!session || session.user?.id !== id) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  try {
    await prisma.user.update({
      where: { id }, // Specify the unique identifier
      data: {
        name,
        bio,
        twitter,
        instagram,
        linkedin,
        facebook,
        tiktok,
        youtube,
        image,
      },
    });

    revalidatePath('/dashboard/profile');
    return { success: true };
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}

export async function createCourse(input: courseInput, sections: { name: string; description: string; videoUrl?: string; pdfUrl?: string; order?: number; }[]) {
  const session = await auth();
  if (!session) {
    return new NextResponse('Forbidden', { status: 403 });
  }
  const { name, description, authorId, price, imageUrl } = input
  await prisma.course.create({
    data: {
      name,
      description,
      author: {
        connect: {
          id: authorId
        }
      },
      price,
      imageUrl,
      Sections: {
        createMany: {
          data: sections
        }
      }
    }
  })
  revalidatePath('/dashboard/profile');
  redirect(`/dashboard/profile/${authorId}`)
}

export async function updateCourse(id: string, input: courseInput, sections: { id?: string; name: string; description: string; videoUrl?: string; pdfUrl?: string; order?: number }[]) {
  const session = await auth();
  const { name, description, authorId, price, imageUrl } = input;
  if (!session || session.user?.id !== authorId) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  await prisma.course.update({
    where: { id },
    data: {
      name,
      description,
      price,
      imageUrl,
    },
  });

  await prisma.$transaction(
    sections.map(section => {
      if (section.id) {
        // If section has an id, update it
        return prisma.section.update({
          where: { id: section.id },
          data: {
            name: section.name,
            description: section.description,
            videoUrl: section.videoUrl,
            pdfUrl: section.pdfUrl,
            order: section.order,
          },
        });
      } else {
        // If section doesn't have an id, create a new one
        return prisma.section.create({
          data: {
            name: section.name,
            description: section.description,
            videoUrl: section.videoUrl,
            pdfUrl: section.pdfUrl,
            order: section.order,
            course: {
              connect: {
                id,
              },
            },
          },
        });
      }
    })
  );

  revalidatePath('/dashboard/profile');
  redirect(`/dashboard/profile/${authorId}`);
}

export async function deleteSection(id: string, authorId: string) {
  const session = await auth();
  if (!session || session.user?.id !== authorId) {
    return new NextResponse('Forbidden', { status: 403 });
  }
  await prisma.section.delete({
    where: {
      id
    }
  })
  revalidatePath('/dashboard/profile');
}

export async function deleteCourse(id: string, authorId: string) {
  const session = await auth();
  if (!session || authorId !== session.user?.id) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const deleteSections = prisma.section.deleteMany({
    where: {
      courseId: id
    }
  })

  const deleteCourse = prisma.course.delete({
    where: {
      id
    }
  })
  await prisma.$transaction([deleteSections, deleteCourse])
  revalidatePath('/dashboard/profile');
}

export async function publishCourse(id: string, authorId: string) {
  const session = await auth();
  if (!session || authorId !== session.user?.id) {
    return new NextResponse('Forbidden', { status: 403 });
  }
  await prisma.course.update({
    where: { id },
    data: {
      status: "PUBLISHED"
    },
  });
  revalidatePath('/dashboard/profile');
}

export async function draftCourse(id: string, authorId: string) {
  const session = await auth();
  if (!session || authorId !== session.user?.id) {
    return new NextResponse('Forbidden', { status: 403 });
  }
  await prisma.course.update({
    where: { id },
    data: {
      status: "DRAFT"
    },
  });
  revalidatePath('/dashboard/profile');
}

const EmailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function addEmail(email: string) {
  try {
    // Validate the email
    const validatedData = EmailSchema.parse({ email });

    // If validation passes, add to the database
    await prisma.emailList.create({
      data: {
        email: validatedData.email,
      },
    });

    return { success: true, message: 'Email added successfully' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: 'An error occurred while adding the email' };
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function joinCourse(courseId: string) {
  const session = await auth();
  if (!session) {
    return redirect('/login')
  }

  await prisma.user.update({
    where: { id: session.user?.id },
    data: {
      purchasedCourses: {
        push: courseId
      }
    }
  });

  await prisma.course.update({
    where: { id: courseId },
    data: {
      students: { increment: 1 }
    },
  });
  revalidatePath(`/dashboard/courses/${courseId}`);
}

export async function BuyCourse(formData: FormData) {
  const session = await auth();
  if (!session) {
    return redirect('/login')
  }
  const id = formData.get("id") as string;
  const data = await prisma.course.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      price: true,
      description: true,
      imageUrl: true,
      author: {
        select: {
          connectedAccountId: true,
        },
      },
    },
  });

  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round((data?.price as number) * 100),
          product_data: {
            name: data?.name as string,
            images: data?.imageUrl ? [data.imageUrl] : [], // Convert single string to array
          },
        },
        quantity: 1,
      },
    ],

    metadata: {
      userId: session.user?.id as string,
      courseId: id,
    },

    payment_intent_data: {
      application_fee_amount: Math.round((data?.price as number) * 100 * 0.037 + 30),
      transfer_data: {
        destination: data?.author?.connectedAccountId as string,
      },
      on_behalf_of: data?.author.connectedAccountId as string,
    },
    success_url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/dashboard/payment/success"
        : "https://skillwave.io/dashboard/payment/success",
    cancel_url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/dashboard/payment/cancel"
        : "https://skillwave.io/dashboard/payment/cancel",
  };

  const checkoutSession = await stripe.checkout.sessions.create(params);
  return redirect(checkoutSession.url as string);
}

export async function createCheckoutSession(priceId: string, promoteKitReferral: any) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error('Not authenticated');
    }

    // Get or create stripe customer
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email,
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customer.id },
      });

      customerId = customer.id;
    }

    // Handle stripe connect account creation
    await createStripeAccount(user)

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/dashboard/payment/success"
          : "https://skillwave.io/dashboard/payment/success",
      cancel_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/dashboard/payment/cancel"
          : "https://skillwave.io/dashboard/payment/cancel",
      subscription_data: {
        metadata: {
          userId: user.id,
          email: user.email,
          promotekit_referral: promoteKitReferral
        },
        trial_period_days: 30
      },
    });

    revalidatePath('/dashboard/billing');
    return { sessionId: checkoutSession.id };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function manageSubscription() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error('Not authenticated');
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscription: true },
    });

    if (!user?.stripeCustomerId) {
      throw new Error('No stripe customer found');
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: process.env.NODE_ENV === "development"
        ? "http://localhost:3000/dashboard/billing"
        : "https://skillwave.io/dashboard/billing",
    });

    revalidatePath('/dashboard/billing');
    return { url: portalSession.url };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function CreateStripeAccoutnLink() {
  const session = await auth();

  if (!session) {
    throw new Error();
  }

  const data = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
    select: {
      connectedAccountId: true,
    },
  });

  const accountLink = await stripe.accountLinks.create({
    account: data?.connectedAccountId as string,
    refresh_url:
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/dashboard/billing`
        : `https://skillwave.io/dashboard/billing`,
    return_url:
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/dashboard`
        : `https://skillwave.io/dashboard`,
    type: "account_onboarding",
  });
  return redirect(accountLink.url);
}

export async function GetStripeDashboardLink() {
  const session = await auth();

  if (!session) {
    throw new Error();
  }

  const data = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
    select: {
      connectedAccountId: true,
    },
  });

  const loginLink = await stripe.accounts.createLoginLink(
    data?.connectedAccountId as string
  );

  return redirect(loginLink.url);
}

export async function createStripeAccount(existingUser: any) {
  try {
    if (existingUser?.connectedAccountId) {
      return NextResponse.json(
        { message: "User already has a connected Stripe account" },
        { status: 200 }
      );
    }

    // Create a new Stripe account for the user
    const stripeAccount = await stripe.accounts.create({
      email: existingUser?.email as string,
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

    // Update the user's connected Stripe account ID in the database
    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        connectedAccountId: stripeAccount.id,
      },
    });

    return NextResponse.json(
      { message: "Stripe account created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating Stripe account:", error);
    return NextResponse.json(
      { message: "Error creating Stripe account" },
      { status: 500 }
    );
  }
}