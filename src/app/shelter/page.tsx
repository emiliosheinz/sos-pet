"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { cepMask, phoneMask } from "~/lib/masks";

const formSchema = z.object({
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
  donations: z.string().optional(),
  address: z.object({
    cep: z
      .string({ message: "Campo obrigatório" })
      .regex(/^\d{5}-\d{3}$/, "Insira um CEP válido"),
    street: z.string({ message: "Campo obrigatório" }),
    number: z
      .string({ message: "Campo obrigatório" })
      .regex(/^\d+$/, "Insira um número válido"),
    state: z.string({ message: "Campo obrigatório" }),
    city: z.string({ message: "Campo obrigatório" }),
    complement: z.string().optional(),
    neighborhood: z.string({ message: "Campo obrigatório" }),
  }),
  social: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    website: z.string().optional(),
  }),
});

export default function Shelter() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      capacity: "",
      occupancy: "",
      donations: "",
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
        twitter: "",
        website: "",
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    window.alert(JSON.stringify(values));
  }

  function populateAddressWithViaCepData(data: {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
  }) {
    form.setValue("address.street", data.logradouro, {
      shouldValidate: !!data.logradouro,
    });
    form.setValue("address.neighborhood", data.bairro, {
      shouldValidate: !!data.bairro,
    });
    form.setValue("address.city", data.localidade, {
      shouldValidate: !!data.localidade,
    });
    form.setValue("address.state", data.uf, {
      shouldValidate: !!data.uf,
    });
  }

  return (
    <main className="flex w-full items-center justify-center bg-white py-6">
      <Form {...form}>
        <form
          className="flex w-full max-w-lg flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl ">Cadastrar abrigo</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do abrigo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Telefone do abrigo"
                    {...field}
                    onChange={(e) => {
                      field.onChange(phoneMask(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Capacidade total"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occupancy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ocupação</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ocupação atual"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="donations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Doações</FormLabel>
                <FormControl>
                  <Input placeholder="Doações aceitas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h2 className="text-lg">Endereço</h2>

          <FormField
            control={form.control}
            name="address.cep"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input
                    placeholder="90450-001"
                    {...field}
                    onChange={(e) => {
                      field.onChange(cepMask(e.target.value));
                    }}
                    onBlur={() => {
                      if (fieldState.invalid) return;
                      fetch(`https://viacep.com.br/ws/${field.value}/json/`)
                        .then((response) => response.json())
                        .then(populateAddressWithViaCepData)
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rua</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da rua" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input placeholder="Bairro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="address.number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Número" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="UF do Estado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input placeholder="Cidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.complement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                  <Input placeholder="Complemento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h2 className="text-lg">Redes sociais</h2>
          <FormField
            control={form.control}
            name="social.instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input placeholder="Instagram" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="social.facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input placeholder="Facebook" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="social.twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter</FormLabel>
                <FormControl>
                  <Input placeholder="Twitter" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="social.website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="Website" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Salvar
          </Button>
        </form>
      </Form>
    </main>
  );
}
