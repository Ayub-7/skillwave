'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from "@/app/lib/prisma"
import { z } from 'zod';

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
    const { id, name, bio, twitter, instagram, linkedin, facebook, tiktok, youtube, image } = input;

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

export async function createCourse(input: courseInput, sections: { name: string; description: string; videoUrl?: string; }[]) {
  const {name, description, authorId, price, imageUrl} = input
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

export async function updateCourse(id: string, input: courseInput, sections: { id?: string; name: string; description: string; videoUrl?: string; }[]) {
  const { name, description, authorId, price, imageUrl } = input;

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
          },
        });
      } else {
        // If section doesn't have an id, create a new one
        return prisma.section.create({
          data: {
            name: section.name,
            description: section.description,
            videoUrl: section.videoUrl,
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

export async function deleteSection(id: string) {
  await prisma.section.delete({
    where: {
      id
    }
  })
  revalidatePath('/dashboard/profile');
}

export async function deleteCourse(id: string) {
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

export async function publishCourse(id: string) {
  await prisma.course.update({
    where: {id},
    data: {
      status: "PUBLISHED"
    },
  });
  revalidatePath('/dashboard/profile');
}

export async function draftCourse(id: string) {
  await prisma.course.update({
    where: {id},
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

export async function createInvoice(formData: InvoiceFormData) {
  // Set values from FormData
  const { customerId, amount, status } = formData;

  const amountInCents = parseFloat(amount) * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: InvoiceFormData) {
  // Set values from FormData
  const { customerId, amount, status } = formData;
  const amountInCents = parseFloat(amount) * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export async function authenticate(formData: LoginFormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signOutAction() {
  await signOut({redirectTo: '/'});
}

export async function signInAction(
  provider: 'google' | 'resend',
  formData?: FormData,
  redirectTo: string = '/dashboard'
) {
  // For email sign in
  if (provider === 'resend' && formData) {
    const email = formData.get('email')
    if (!email || typeof email !== 'string') {
      throw new Error('Invalid email')
    }

    await signIn('resend', {
      email,
      redirectTo,
    })

    return { success: true }
  }

  // For Google sign in
  if (provider === 'google') {
    await signIn('google', {
      redirectTo,
    })

    return { success: true }
  }
}
    
  

