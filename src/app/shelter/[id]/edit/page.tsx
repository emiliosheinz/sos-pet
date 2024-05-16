"use client";

import { Loader2 } from "lucide-react";

import { api } from "~/trpc/react";
import { FormEditRegister } from "~/components/shelter/form-edit-register";

export default function ShelterPage({ params }: { params: { id: number } }) {
  const { data, isLoading } = api.shelter.findUserShelterById.useQuery({
    id: Number(params.id),
  });

  if (isLoading) {
    return (
      <div className="flex w-full justify-center pt-28">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex w-full justify-center pt-28">
        <h1 className="text-2xl font-semibold">Abrigo não encontrado</h1>
      </div>
    );
  }

  return <FormEditRegister shelter={data} />;
}
