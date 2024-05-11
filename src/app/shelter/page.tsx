"use client";

import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { type z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "~/components/ui/form";
import { cepMask, phoneMask, socialMediaMask } from "~/lib/masks";
import { shelterSchema } from "~/schemas/shelter";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { TagInput } from "~/components/tag-input";
import { defaultValues } from "./constants";
import {
  ShelterContextProvider,
  useShelterContext,
} from "~/contexts/ShelterContext";

function Shelter() {
  const { shelter } = useShelterContext();
  const form = useForm<z.infer<typeof shelterSchema>>({
    resolver: zodResolver(shelterSchema),
    defaultValues: {
      ...defaultValues,
      ...shelter,
    },
  });
  const router = useRouter();
  const createShelter = api.shelter.create.useMutation({
    onSuccess: () => {
      router.replace("/");
      toast.success("Abrigo criado com sucesso!");
    },
    onError: (error) => {
      toast.error("Ops! Houve um erro ao criar o abrigo.");
      console.error(error);
    },
  });
  const updateCurrentUserShelter =
    api.shelter.updateCurrentUserShelter.useMutation({
      onSuccess: () => {
        toast.success("Abrigo atualizado com sucesso!");
        window.scrollTo(0, 0);
      },
      onError: (error) => {
        toast.error("Ops! Houve um erro ao atualizar o abrigo.");
        console.error(error);
      },
    });
  const isLoading =
    createShelter.isPending || updateCurrentUserShelter.isPending;
  const isEditing = !!shelter;
  const hasModifiedInputs = Object.keys(form.formState.dirtyFields).length > 0;

  async function onSubmit(values: z.infer<typeof shelterSchema>) {
    if (isEditing) {
      updateCurrentUserShelter.mutate(values);
    } else {
      createShelter.mutate(values);
    }
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
    <main className="flex w-full items-center justify-center bg-white px-3 py-6">
      <Form {...form}>
        <form
          className="flex w-full max-w-lg flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl ">Informações do abrigo</h1>
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
                      placeholder="Capacidade máxima"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone (Whatsapp)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="(XX) XXXXX-XXXX"
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
          <h2 className="mt-3 text-xl">Doações e Voluntários</h2>
          <FormField
            control={form.control}
            name="donations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Doações</FormLabel>

                <FormControl>
                  <TagInput {...field} placeholder="Ex: Ração" />
                </FormControl>
                <FormDescription>Insira um item de cada vez</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="volunteers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Voluntários</FormLabel>

                <FormControl>
                  <TagInput {...field} placeholder="Ex: Veterinários" />
                </FormControl>
                <FormDescription>Insira um item de cada vez</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <h2 className="mt-3 text-xl">Endereço</h2>
          <FormField
            control={form.control}
            name="address.cep"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input
                    placeholder="XXXXX-XXX"
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
                    <Input placeholder="Número" {...field} />
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
                    <Input
                      placeholder="UF do Estado"
                      {...field}
                      onChange={(e) => {
                        field.onChange(
                          e.target.value.toUpperCase().slice(0, 2),
                        );
                      }}
                    />
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
                <FormLabel>Complemento (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="Complemento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h2 className="mt-3 text-xl">Redes sociais</h2>
          <FormField
            control={form.control}
            name="social.instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram (opcional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="@seu_usuario"
                    {...field}
                    onChange={(e) => {
                      field.onChange(socialMediaMask(e.target.value));
                    }}
                  />
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
                <FormLabel>Facebook (opcional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="@seu_usuario"
                    {...field}
                    onChange={(e) => {
                      field.onChange(socialMediaMask(e.target.value));
                    }}
                  />
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
                <FormLabel>Twitter (opcional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="@seu_usuario"
                    {...field}
                    onChange={(e) => {
                      field.onChange(socialMediaMask(e.target.value));
                    }}
                  />
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
                <FormLabel>Website (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://exemplo.com.br" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || (isEditing && !hasModifiedInputs)}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Salvar"}
          </Button>
        </form>
      </Form>
    </main>
  );
}

export default function ShelterPage() {
  const { data, isLoading } = api.shelter.findCurrentUserShelter.useQuery();

  if (isLoading) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <ShelterContextProvider shelter={data ?? null}>
      <Shelter />
    </ShelterContextProvider>
  );
}
