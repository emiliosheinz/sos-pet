"use client";
import { SearchInput } from "~/components/search-input";
import { api } from "~/trpc/react";
import Fuse from "fuse.js";
import { type PropsWithChildren, Suspense, useMemo } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { useDebouncedState } from "~/hooks/use-debouced-state";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { FiInfo } from "react-icons/fi";
import dynamic from "next/dynamic";

const ShelterCard = dynamic(() =>
  import("~/components/shelter-card").then((module) => module.ShelterCard),
);

const Grid = ({ children }: PropsWithChildren) => (
  <div className="grid w-full max-w-7xl grid-cols-1 gap-5 md:grid-cols-2">
    {children}
  </div>
);

export default function Home() {
  const [shelters] = api.shelter.findAll.useSuspenseQuery();
  const [searchTerm, setSearchTerm] = useDebouncedState("", 300);

  const filteredShelters = useMemo(() => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm.length === 0 || !shelters) {
      return shelters ?? [];
    }

    const fuse = new Fuse(shelters, {
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
  }, [shelters, searchTerm]);

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
      <Suspense
        fallback={
          <Grid>
            <Skeleton className="h-[306px] w-full rounded-xl" />
            <Skeleton className="h-[306px] w-full rounded-xl" />
            <Skeleton className="h-[306px] w-full rounded-xl" />
            <Skeleton className="h-[306px] w-full rounded-xl" />
          </Grid>
        }
      >
        {!!filteredShelters?.length ? (
          <Grid>
            {filteredShelters?.map((shelter) => (
              <ShelterCard key={shelter.id} shelter={shelter} />
            ))}
          </Grid>
        ) : (
          <div className="max-w-md pt-5 text-center text-gray-600">
            <span className="mb-2 font-bold">
              Desculpe, nenhum resultado encontrado.
            </span>
            <p>
              Não encontramos nenhum resultado correspondente à sua busca. Por
              favor, revise os critérios de pesquisa e tente novamente.
            </p>
          </div>
        )}
      </Suspense>
    </main>
  );
}
