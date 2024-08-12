'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {prisma} from "@/app/lib/prisma"

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
  id: number; // Assuming you use an ID to identify the user
  name: string;
  bio?: string;
  twitter?: string
  instagram?: string; // Optional field
  linkedin?: string; // Optional field
  facebook?: string; // Optional field
  tiktok?: string; // Optional field
  youtube?: string; // Optional field
}

interface courseInput {
  name: string;
  description?: string;
  authorId: number;
  price: number;
}

export async function updateUser(input: UpdateUserInput) {
    const { id, name, bio, twitter, instagram, linkedin, facebook, tiktok, youtube } = input;

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
      },
    });

    revalidatePath('/dashboard/profile');
    return { success: true };
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}

export async function createCourse(input: courseInput, sections: { name: string; description: string; }[]) {
  const {name, description, authorId, price} = input
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
      Sections: {
        createMany: {
          data: sections
        }
      }
    }
  })
  revalidatePath('/dashboard/profile');
}

export async function deleteCourse(id: number) {
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
  await signOut();
}
