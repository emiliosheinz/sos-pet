"use client";
import { notFound } from "next/navigation";

import { api } from "~/trpc/react";
import { FormEditRegister } from "~/app/user/shelters/_components";
import { Skeleton } from "~/components/ui/skeleton";
import { toast } from "sonner";

export default function EditShelterPage({
  params,
}: {
  params: { id: number };
}) {
  const { data, isLoading, error } =
    api.userShelters.findUserShelterById.useQuery({
      id: Number(params.id),
    });

  if (error?.data?.httpStatus === 404 && !isLoading) {
    notFound();
  }

  if (!data && !isLoading) {
    toast.error(
      "Erro ao carregar os dados abrigo. Tente novamente mais tarde.",
    );
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl bg-white px-4">
        <div className="m-auto flex w-full max-w-2xl flex-col flex-wrap gap-3 pt-6">
          <Skeleton className="h-[33px] w-[180px] rounded-xl" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
      </main>
    );
  }

  return <FormEditRegister shelter={data} />;
}
