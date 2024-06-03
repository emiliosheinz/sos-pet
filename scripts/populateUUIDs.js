import { PrismaClient } from "@prisma/client";
import cuid from "cuid";

const prisma = new PrismaClient();

async function updateUsersWithUUID() {
  try {
    const shelters = await prisma.shelter.findMany({
      where: {
        uuid: null,
      },
    });

    const updatePromises = shelters.map((shelter) => {
      return prisma.shelter.update({
        where: { id: shelter.id },
        data: { uuid: cuid() },
      });
    });

    await Promise.all(updatePromises);

    console.log(`Updated ${shelters.length} shelters with UUIDs.`);
  } catch (error) {
    console.error("Error updating shelters with UUIDs:", error);
  } finally {
    await prisma.$disconnect();
  }
}

await updateUsersWithUUID();
