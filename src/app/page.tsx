"use client";
import { Card } from "~/components/card/";
import { SearchInput } from "~/components/search-input";
import { api } from "~/trpc/react";
import Fuse from "fuse.js";
import { useMemo } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { useDebouncedState } from "~/hooks/use-debouced-state";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { FiInfo } from "react-icons/fi";

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
      <Alert className="mb-6 w-full max-w-7xl">
        <FiInfo />
        <AlertTitle>Atenção</AlertTitle>
        <AlertDescription>
          Algumas informações, como vagas disponíveis, podem estar
          desatualizadas. Em caso de dúvida, entre em contato diretamente com o
          abrigo.
        </AlertDescription>
      </Alert>

      <div className="mb-6 flex w-full max-w-7xl items-center justify-between space-x-4">
        <SearchInput handleSearch={handleSearch} />
      </div>
      {!isLoading && !filteredShelters?.length && (
        <div className="text-center text-gray-600">
          <span className="mb-2 font-bold">
            Desculpe, nenhum resultado encontrado.
          </span>
          <p>
            Não encontramos nenhum resultado correspondente à sua busca. Por
            favor, revise os critérios de pesquisa e tente novamente.
          </p>
        </div>
      )}
      <div className="grid w-full max-w-7xl grid-cols-1 gap-5 md:grid-cols-2">
        {isLoading ? (
          <>
            <Skeleton className="h-[306px] w-full rounded-xl" />
            <Skeleton className="h-[306px] w-full rounded-xl" />
            <Skeleton className="h-[306px] w-full rounded-xl" />
            <Skeleton className="h-[306px] w-full rounded-xl" />
          </>
        ) : (
          filteredShelters?.map((shelter) => (
            <Card key={shelter.id} shelter={shelter} />
          ))
        )}
      </div>
    </main>
  );
}
