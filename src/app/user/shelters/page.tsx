"use client";

import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";

import { type ShelterTable, columns } from "./columns";
import { DataTable } from "./data-table";
import Link from "next/link";

function Shelters({ items }: { items?: ShelterTable[] | null }) {
  const renderContent = () => {
    if (!items || items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center">
          <p>Você não possui abrigos cadastrados.</p>
          <p>
            Se desejar cadastrar um novo abrigo,{" "}
            <Link className="underline" href="/shelter">
              clique aqui.
            </Link>
          </p>
        </div>
      );
    }

    return <DataTable columns={columns} data={items} />;
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
      <div className="flex w-full justify-center pt-28">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  return <Shelters items={data} />;
}
