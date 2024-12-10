import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'ayub@next.com' },
    update: {},
    create: {
      email: 'ayub@next.com',
      name: 'Ayub Test',
      bio: 'Welcome to the best place to learn about everything.'
    }
  })
  console.log({ user })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })