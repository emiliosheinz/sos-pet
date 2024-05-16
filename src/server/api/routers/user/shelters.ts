import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const userSheltersRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx }) => {
    const result = await db.shelter.findMany({
      where: {
        createdById: ctx.session.user.id,
      },
    });

    if (!result) {
      return null;
    }

    return result.map((shelter) => ({
      id: shelter.id,
      name: shelter.name,
      phone: shelter.phone,
      capacity: shelter.capacity.toString(),
      occupancy: shelter.occupancy.toString(),
      donations: shelter.donations,
      volunteers: shelter.volunteers,
      social: {
        instagram: shelter.instagram ?? undefined,
        facebook: shelter.facebook ?? undefined,
      },
      address: {
        cep: shelter.addressZip,
        street: shelter.addressStreet,
        number: shelter.addressNumber,
        state: shelter.addressState,
        city: shelter.addressCity,
        complement: shelter.addressComplement ?? undefined,
        neighborhood: shelter.addressNeighborhood,
      },
    }));
  }),
});
