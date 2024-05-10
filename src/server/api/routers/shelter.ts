import { shelterSchema } from "~/schemas/shelter";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const shelterRouter = createTRPCRouter({
  findAll: publicProcedure.query(async () => {
    return db.shelter.findMany();
  }),
  create: protectedProcedure
    .input(shelterSchema)
    .mutation(async ({ ctx, input }) => {
      await db.shelter.create({
        data: {
          createdById: ctx.session.user.id,
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
});
