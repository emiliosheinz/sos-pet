import { z } from "zod";
import { apiShelterSchema } from "~/schemas/shelter";
import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

const InputIdParams = z.object({
  id: z.number(),
});

export const shelterRouter = createTRPCRouter({
  findAll: publicProcedure.query(async () => {
    return db.shelter.findMany();
  }),
  findById: publicProcedure.input(InputIdParams).query(async (opts) => {
    const { id } = opts.input;

    const result = await db.shelter.findUnique({
      where: {
        id,
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
  findUserShelterById: protectedProcedure
    .input(InputIdParams)
    .query(async ({ ctx, input }) => {
      const result = await db.shelter.findFirst({
        where: {
          createdById: ctx.session.user.id,
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
          latitude: result.latitude ?? undefined,
          longitude: result.longitude ?? undefined,
        },
      };
    }),
  create: protectedProcedure
    .input(apiShelterSchema)
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
          instagram: input.social.instagram,
          facebook: input.social.facebook,
          addressZip: input.address.cep,
          addressStreet: input.address.street,
          addressNumber: input.address.number,
          addressState: input.address.state,
          addressCity: input.address.city,
          addressComplement: input.address.complement,
          addressNeighborhood: input.address.neighborhood,
          latitude: input.address.latitude,
          longitude: input.address.longitude,
        },
      });
    }),
  update: protectedProcedure
    .input(apiShelterSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await db.shelter.findFirst({
        where: {
          createdById: ctx.session.user.id,
          id: input.id,
        },
      });

      if (!result) {
        throw new Error("Shelter not found");
      }

      await db.shelter.update({
        where: {
          id: result.id,
          createdById: ctx.session.user.id,
        },
        data: {
          name: input.name,
          phone: input.phone,
          capacity: +input.capacity,
          occupancy: +input.occupancy,
          donations: input.donations,
          volunteers: input.volunteers,
          instagram: input.social.instagram,
          facebook: input.social.facebook,
          addressZip: input.address.cep,
          addressStreet: input.address.street,
          addressNumber: input.address.number,
          addressState: input.address.state,
          addressCity: input.address.city,
          addressComplement: input.address.complement,
          addressNeighborhood: input.address.neighborhood,
          latitude: input.address.latitude,
          longitude: input.address.longitude,
        },
      });
    }),
  delete: protectedProcedure
    .input(InputIdParams)
    .mutation(async ({ ctx, input }) => {
      const result = await db.shelter.findFirst({
        where: {
          createdById: ctx.session.user.id,
          id: input.id,
        },
      });

      if (!result) {
        throw new Error("Shelter not found");
      }

      await db.shelter.delete({
        where: {
          id: result.id,
        },
      });
    }),
});
