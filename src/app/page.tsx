"use client";
import { Card } from "~/components/card/";
import { SearchInput } from "~/components/search-input";
import { api } from "~/trpc/react";
import { Filters } from "~/components/filters";
import Fuse from "fuse.js";
import { useMemo } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { useDebouncedState } from "~/hooks/use-debouced-state";

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
  const { data, isLoading } = api.shelter.findAll.useQuery();
  const [searchTerm, setSearchTerm] = useDebouncedState("", 300);

  const filteredShelters = useMemo(() => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm.length === 0 || !data) {
      return data ?? [];
    }

    const fuse = new Fuse(data, {
      keys: [
        "name",
        "addressStreet",
        "addressNeighborhood",
        "addressZip",
        "addressCity",
        "addressState",
      ],
      includeScore: true,
      threshold: 0.4,
    });

    return fuse.search(trimmedSearchTerm).map((result) => result.item);
  }, [data, searchTerm]);

  const handleSearch = (event: { target: { value: string } }) => {
    setSearchTerm(event.target.value);
  };

  return (
    <main className="flex w-full flex-col items-center justify-center gap-2 bg-white px-3 pt-8">
      <div className="mb-6 flex w-full max-w-7xl items-center justify-between space-x-4">
        <SearchInput handleSearch={handleSearch} />
        {/* <Filters menus={menus} /> */}
      </div>
      <div className="grid w-full max-w-7xl grid-cols-1 gap-5 md:grid-cols-2">
        {isLoading ? (
          <>
            <Skeleton className="h-[306px] w-full rounded-xl" />
            <Skeleton className="h-[306px] w-full rounded-xl" />
            <Skeleton className="h-[306px] w-full rounded-xl" />
            <Skeleton className="h-[306px] w-full rounded-xl" />
          </>
        ) : (
          [...filteredShelters, ...filteredShelters, ...filteredShelters]?.map(
            (shelter) => <Card key={shelter.id} shelter={shelter} />,
          )
        )}
      </div>
    </main>
  );
}
