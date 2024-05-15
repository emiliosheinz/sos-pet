import { type z } from "zod";
import { type shelterSchema } from "~/schemas/shelter";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

type Shelter = z.infer<typeof shelterSchema> | null;

type Shelters = {
  results: Shelter[];
};

export const userSheltersRouter = createTRPCRouter({
  findCurrentUserShelters: protectedProcedure.query(
    async ({ ctx }): Promise<Shelters> => {
      const result = await db.shelter.findMany({
        where: {
          createdById: ctx.session.user.id,
        },
      });

      if (!result) {
        return {
          results: [],
        };
      }

      return {
        results: result.map((shelter) => ({
          id: shelter.id ?? undefined,
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
          formattedAddress: `${shelter.addressStreet}, ${shelter.addressNumber} - ${shelter.addressNeighborhood}, ${shelter.addressCity} - ${shelter.addressState}`,
        })),
      };
    },
  ),
});
