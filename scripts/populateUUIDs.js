import { PrismaClient } from "@prisma/client";
import cuid from "cuid";

const prisma = new PrismaClient();

async function updateUsersWithUUID() {
  try {
    const users = await prisma.shelter.findMany({
      where: {
        uuid: null,
      },
    });

    const updatePromises = users.map((user) => {
      return prisma.shelter.update({
        where: { id: user.id },
        data: { uuid: cuid() },
      });
    });

    await Promise.all(updatePromises);

    console.log(`Updated ${users.length} users with UUIDs.`);
  } catch (error) {
    console.error("Error updating users with UUIDs:", error);
  } finally {
    await prisma.$disconnect();
  }
}

await updateUsersWithUUID();
