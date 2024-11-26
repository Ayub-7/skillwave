import prisma from "@/app/lib/prisma"

export async function getUser(userId: string | undefined) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      courses: {
        include: {
          Sections: true
        }
      },
      subscription: true
    },
  });
  return user
}

export async function getUserDetails(userId: string | undefined) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user
}

export async function getPurchasedCourses(user: any) {
  const purchased = await prisma.course.findMany({
    where: {
      id: {
        in: user.purchasedCourses
      }
    }
  })
  return purchased
}

export async function getCourse(id: string) {
  const course = await prisma.course.findUnique({
    where: {
      id: id
    },
    include: {
      Sections: true
    }
  })
  return course
}

export async function getSection(id: string) {
  const course = await prisma.section.findUnique({
    where: {
      id: id
    }
  })
  return course
}

export async function getAllCourses() {
  return await prisma.course.findMany({where: {status: "PUBLISHED"}, include: {author: true}}) 
}