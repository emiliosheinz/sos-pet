import { z } from "zod";

export const shelterSchema = z.object({
  name: z
    .string({
      message: "Campo obrigatório",
    })
    .max(255, "O nome não pode ter mais que 255 caracteres")
    .min(3, "O nome não pode ter menos que 3 caracteres"),
  phone: z
    .string({
      message: "Campo obrigatório",
    })
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Insira um telefone válido"),
  capacity: z
    .string({ message: "Campo obrigatório" })
    .regex(/^\d+$/, "Insira um número válido")
    .refine((capacity) => +capacity > 0, "A capacidade deve ser maior que 0"),
  occupancy: z
    .string({ message: "Campo obrigatório" })
    .regex(/^\d+$/, "Insira um número válido")
    .refine(
      (occupancy) => +occupancy >= 0,
      "A ocupação deve ser maior ou igual a 0",
    ),
  donations: z.array(z.string()),
  volunteers: z.array(z.string()),
  address: z.object({
    cep: z
      .string({ message: "Campo obrigatório" })
      .regex(/^\d{5}-\d{3}$/, "Insira um CEP válido"),
    street: z.string({ message: "Campo obrigatório" }),
    number: z
      .string({ message: "Campo obrigatório" })
      .regex(/^\d+$/, "Insira um número válido"),
    state: z
      .string({ message: "Campo obrigatório" })
      .max(2, "Insira a sigla do estado"),
    city: z.string({ message: "Campo obrigatório" }),
    complement: z.string().optional(),
    neighborhood: z.string({ message: "Campo obrigatório" }),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  social: z.object({
    instagram: z
      .string()
      .optional()
      .refine((value) => {
        if (!value) return true;
        return value.startsWith("@");
      }, "O nome de o usuário do Instagram deve começar com @"),
    facebook: z
      .string()
      .optional()
      .refine((value) => {
        if (!value) return true;
        return value.startsWith("@");
      }, "O nome de o usuário do Facebook deve começar com @"),
  }),
});
