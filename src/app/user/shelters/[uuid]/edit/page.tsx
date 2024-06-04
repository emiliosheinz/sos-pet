"use client";

import { api } from "~/trpc/react";
import { FormEditRegister } from "~/app/user/shelters/_components";
import { Skeleton } from "~/components/ui/skeleton";
import { notFound } from "next/navigation";
import { FiAlertTriangle } from "react-icons/fi";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export default function EditShelterPage({
  params,
}: {
  params: { uuid: string };
}) {
  const { data, isLoading, error } =
    api.userShelters.findUserShelterByUuid.useQuery({
      uuid: params.uuid,
    });

  if (error) {
    if (error?.data?.code === "NOT_FOUND") {
      return notFound();
    }

    return (
      <main className="mx-auto max-w-7xl bg-white px-4">
        <div className="m-auto flex w-full max-w-2xl flex-col flex-wrap gap-3 pt-6">
          <Alert variant="destructive">
            <FiAlertTriangle />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              Ocorreu um erro ao carregar os dados do abrigo. Por favor, tente
              novamente mais tarde.
            </AlertDescription>
          </Alert>
        </div>
      </main>
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
