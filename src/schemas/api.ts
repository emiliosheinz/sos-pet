import { z } from "zod";
import { shelterSchema } from "./shelter";

export const apiSchema = z.object({
  ...shelterSchema.shape,
  address: z.object({
    ...shelterSchema.shape.address.shape,
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
});
