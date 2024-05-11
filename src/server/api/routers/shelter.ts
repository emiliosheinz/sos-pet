import { shelterSchema } from "~/schemas/shelter";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import { type z } from "zod";

export const shelterRouter = createTRPCRouter({
  findAll: publicProcedure.query(async () => {
    return db.shelter.findMany();
  }),
  findCurrentUserShelter: protectedProcedure.query(
    async ({ ctx }): Promise<z.infer<typeof shelterSchema> | null> => {
      const result = await db.shelter.findFirst({
        where: {
          createdById: ctx.session.user.id,
        },
      });
      if (!result) {
        return null;
      }
      return {
        name: result.name,
        phone: result.phone,
        capacity: result.capacity.toString(),
        occupancy: result.occupancy.toString(),
        donations: result.donations,
        volunteers: result.volunteers,
        social: {
          twitter: result.twitter ?? undefined,
          instagram: result.instagram ?? undefined,
          facebook: result.facebook ?? undefined,
          website: result.website ?? undefined,
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
    },
  ),
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
  updateCurrentUserShelter: protectedProcedure
    .input(shelterSchema)
    .mutation(async ({ input, ctx }) => {
      await db.shelter.update({
        where: {
          createdById: ctx.session.user.id,
        },
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
});
