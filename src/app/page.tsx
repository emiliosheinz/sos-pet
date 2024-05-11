"use client";
import { Card } from "~/components/card/";
import { SearchInput } from "~/components/search-input";
import { api } from "~/trpc/react";
import { Filters } from "~/components/filters";
import Fuse from "fuse.js";
import { useMemo } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { useDebouncedState } from "~/hooks/use-debouce";

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
  const [searchTerm, setSearchTerm] = useDebouncedState("", 300);
  console.log(searchTerm);

  const filteredShelters = useMemo(() => {
    let result = data ?? [];
    if (searchTerm.trim() !== "") {
      const fuse = new Fuse(result, {
        keys: ["name", "street", "addressCity", "addressState"],
        includeScore: true,
        threshold: 0.4,
      });

      result = fuse.search(searchTerm).map((result) => result.item);
    }

    return result;
  }, [data, searchTerm]);

  const handleSearch = (event: { target: { value: string } }) => {
    setSearchTerm(event.target.value);
  };

  return (
    <main className="flex w-full flex-col  items-center justify-center gap-2 bg-white pt-8">
      <div className="mb-6 flex w-full items-center justify-between space-x-4 md:w-[672px]">
        <SearchInput handleSearch={handleSearch} />
        <Filters menus={menus} />
      </div>

      {isLoading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[306px] w-[390px] rounded-xl md:w-[672px]" />
          <Skeleton className="h-[306px] w-[390px] rounded-xl md:w-[672px]" />
          <Skeleton className="h-[306px] w-[390px] rounded-xl md:w-[672px]" />
        </div>
      ) : (
        filteredShelters?.map((shelter) => (
          <Card key={shelter.id} shelter={shelter} />
        ))
      )}
    </main>
  );
}
