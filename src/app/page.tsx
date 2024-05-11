"use client";
import { Card } from "~/components/card/";
import { SearchInput } from "~/components/search-input";
import { api } from "~/trpc/react";
import { Filters } from "~/components/filters";
import { type Shelter } from "@prisma/client";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { Skeleton } from "~/components/skeleton";

const menus = [
  {
    label: "Cidades",
    items: [
      { label: "Novo Hamburgo", checked: true },
      { label: "Estancia velha", checked: false },
      { label: "Campo Bom", checked: true },
    ],
  },
  {
    label: "Status",
    items: [
      { label: "Ativo", checked: true },
      { label: "Inativo", checked: false },
    ],
  },
  {
    label: "Tipo de Doação",
    items: [
      { label: "Financeira", checked: false },
      { label: "Material", checked: true },
    ],
  },
];

export default function Home() {
  const { data, isLoading } = api.shelter.findAll.useQuery();
  const [filteredShelters, setFilteredShelters] = useState<Shelter[]>([]);

  useEffect(() => {
    if (!isLoading && data) setFilteredShelters(data);
  }, [data, isLoading]);

  const fuse = new Fuse(filteredShelters, {
    keys: ["name", "addressCity", "addressState"],
    includeScore: true,
    threshold: 0.4,
  });

  const handleSearch = (event: { target: { value: string } }) => {
    const searchTerm = event.target.value.trim();

    if (searchTerm === "") {
      setFilteredShelters(data ?? []);
    } else {
      const results = fuse.search(searchTerm).map((result) => result.item);

      setFilteredShelters(results);
    }
  };

  return (
    <main className="flex w-full flex-col  items-center justify-center gap-2 bg-white pt-8">
      <div className="mb-6 flex w-full items-center justify-between space-x-4 md:w-[672px]">
        <SearchInput handleSearch={handleSearch} />
        <Filters menus={menus} />
      </div>

      {isLoading ? (
        <Skeleton />
      ) : (
        filteredShelters?.map((shelter) => (
          <Card key={shelter.id} shelter={shelter} />
        ))
      )}
    </main>
  );
}
