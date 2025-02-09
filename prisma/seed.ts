import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const u = await prisma.user.create({
    data: {
      email: "mail@mailinator.com",
      name: "temp",
      walletAddress: "0x3ad456d3753BBA798dBCF1073D111A2f12b0feD2",
    },
  });

  await prisma.post.create({
    data: {
      title: "Hello World",
      content: "This is my first post",
      published: true,
      ipfsHash: "QmZ1",
      author: {
        connect: {
          walletAddress: u.walletAddress,
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
