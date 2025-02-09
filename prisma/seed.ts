import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const u = await prisma.user.create({
    data: {
      email: "mail@mailinator.com",
      name: "temp",
    },
  });

  await prisma.post.create({
    data: {
      title: "Hello World",
      content: "This is my first post",
      published: true,
      author: {
        connect: {
          id: u.id,
        },
      },
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    console.log("Seeding done");
    await prisma.$disconnect();
  });
