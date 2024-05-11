"use client";
import { Card } from "~/components/card/";
import { SearchInput } from "~/components/search-input";
import { api } from "~/trpc/react";
import { Filters } from "~/components/filters";

const menus = [
  {
    label: "Disponibilidade",
    items: [
      { label: "Com vagas", checked: true },
      { label: "Sem vagas", checked: false },
    ],
  },
];

export default function Home() {
  const { data } = api.shelter.findAll.useQuery();

  return (
    <main className="flex w-full flex-col  items-center justify-center gap-2 bg-white pt-8">
      <div className="mb-6 flex w-full items-center justify-between space-x-4 md:w-[672px]">
        <SearchInput />
        <Filters menus={menus} />
      </div>
      {data?.map((shelter) => <Card key={shelter.id} shelter={shelter} />)}
    </main>
  );
}
