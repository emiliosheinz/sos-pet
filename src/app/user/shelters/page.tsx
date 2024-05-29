"use client";

import { api } from "~/trpc/react";

import {
  type ShelterTable,
  SheltersListTable,
} from "./_components/shelters-list-table";
import Link from "next/link";
import { Skeleton } from "~/components/ui/skeleton";

function Shelters({ items }: { items?: ShelterTable[] | null }) {
  const renderContent = () => {
    if (!items || items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center">
          <p>Você não possui abrigos cadastrados.</p>
          <p>
            Se desejar cadastrar um novo abrigo,{" "}
            <Link className="underline" href="/user/shelters/create">
              clique aqui.
            </Link>
          </p>
        </div>
      );
    }

    return <SheltersListTable data={items} />;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6">
      <h1 className="mb-10 text-3xl font-bold">Meus abrigos</h1>
      {renderContent()}
    </div>
  );
}

export default function SheltersPage() {
  const { data, isLoading } = api.userShelters.findAll.useQuery();

  if (isLoading) {
    return (
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 lg:justify-between">
        <Skeleton className="mb-3 h-[33px] w-[180px] rounded-xl" />
        <Skeleton className="h-[80px] w-full rounded-xl" />
        <Skeleton className="h-[80px] w-full rounded-xl" />
        <Skeleton className="h-[80px] w-full rounded-xl" />
      </div>
    );
  }

  return <Shelters items={data} />;
}
