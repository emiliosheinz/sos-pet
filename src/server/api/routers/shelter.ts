import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

const InputIdParams = z.object({
  id: z.number(),
});

export const shelterRouter = createTRPCRouter({
  findAll: publicProcedure.query(async () => {
    return db.shelter.findMany();
  }),
  findById: publicProcedure.input(InputIdParams).query(async ({ input }) => {
    const result = await db.shelter.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!result) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "The server cannot find the requested resource.",
      });
    }

    return {
      id: result.id,
      name: result.name,
      phone: result.phone,
      capacity: result.capacity.toString(),
      occupancy: result.occupancy.toString(),
      donations: result.donations,
      volunteers: result.volunteers,
      social: {
        instagram: result.instagram ?? undefined,
        facebook: result.facebook ?? undefined,
      },
      address: {
        cep: result.addressZip,
        street: result.addressStreet,
        number: result.addressNumber,
        state: result.addressState,
        city: result.addressCity,
        complement: result.addressComplement ?? undefined,
        neighborhood: result.addressNeighborhood,
      },
    };
  }),
});
