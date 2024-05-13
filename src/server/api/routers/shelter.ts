import { z } from "zod";
import { shelterSchema } from "~/schemas/shelter";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const shelterRouter = createTRPCRouter({
  findAll: publicProcedure.query(async () => {
    return db.shelter.findMany();
  }),
  findById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async (opts) => {
      const { id } = opts.input;

      return db.shelter.findUnique({
        where: {
          id: id,
        },
      });
    }),
  create: publicProcedure.input(shelterSchema).mutation(async ({ input }) => {
    await db.shelter.create({
      data: {
        name: input.name,
        phone: input.phone,
        capacity: +input.capacity,
        occupancy: +input.occupancy,
        donations: input.donations,
        volunteers: input.volunteers,
        twitter: input.social.twitter,
        instagram: input.social.instagram,
        facebook: input.social.facebook,
        website: input.social.website,
        addressZip: input.address.cep,
        addressStreet: input.address.street,
        addressNumber: input.address.number,
        addressState: input.address.state,
        addressCity: input.address.city,
        addressComplement: input.address.complement,
        addressNeighborhood: input.address.neighborhood,
      },
    });
  }),
  // updateCurrentShelterById: publicProcedure
  //   .input(shelterSchema)
  //   .mutation(async ({ input }) => {
  //     await db.shelter.update({
  //       where: {
  //         id: input.id,
  //       },
  //       data: {
  //         name: input.name,
  //         phone: input.phone,
  //         capacity: +input.capacity,
  //         occupancy: +input.occupancy,
  //         donations: input.donations,
  //         volunteers: input.volunteers,
  //         twitter: input.social.twitter,
  //         instagram: input.social.instagram,
  //         facebook: input.social.facebook,
  //         website: input.social.website,
  //         addressZip: input.address.cep,
  //         addressStreet: input.address.street,
  //         addressNumber: input.address.number,
  //         addressState: input.address.state,
  //         addressCity: input.address.city,
  //         addressComplement: input.address.complement,
  //         addressNeighborhood: input.address.neighborhood,
  //       },
  //     });
  //   }),
});
