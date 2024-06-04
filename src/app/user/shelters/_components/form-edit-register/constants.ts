import { type DefaultValues } from "react-hook-form";
import { type z } from "zod";
import { type shelterSchema } from "~/schemas/shelter";

export const defaultValues: DefaultValues<z.infer<typeof shelterSchema>> = {
  name: "",
  phone: "",
  capacity: "",
  occupancy: "",
  donations: [],
  volunteers: [],
  address: {
    cep: "",
    street: "",
    number: "",
    state: "",
    city: "",
    complement: "",
  },
  social: {
    instagram: "",
    facebook: "",
  },
};
