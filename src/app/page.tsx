"use client";
import { useState, useEffect } from "react";
import { Card } from "~/components/card/";
import { SearchInput } from "~/components/search-input";
import { api } from "~/trpc/react";
import Fuse from "fuse.js";
import { useMemo } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { useDebouncedState } from "~/hooks/use-debouced-state";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { FiInfo } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Icon, type LatLngExpression, type LatLngTuple } from "leaflet";
import { Pin } from "lucide-react";

function UserLocationMap({ userLocation }: { userLocation: LatLngTuple }) {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView(userLocation, 13);
    }
  }, [userLocation, map]);

  return null;
}

export default function Home() {
  const { data, isLoading } = api.shelter.findAll.useQuery();
  const [searchTerm, setSearchTerm] = useDebouncedState("", 300);
  const [userLocation, setUserLocation] = useState<LatLngTuple>([
    -30.0346, -51.2177,
  ]); // Default to Porto Alegre

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location: ", error);
      },
    );
  }, []);

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
      <MapContainer
        style={{ height: "400px", width: "100%", maxWidth: "1280px" }}
        center={userLocation}
        zoom={13}
      >
        <UserLocationMap userLocation={userLocation} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data?.map((shelter) => {
          if (!shelter.latitude || !shelter.longitude) return null;

          return (
            <Marker
              key={shelter.id}
              position={[shelter.latitude, shelter.longitude]}
            >
              <Popup>
                <div className="flex flex-col space-y-2">
                  <h2 className="text-lg font-bold">{shelter.name}</h2>
                  <p>{shelter.phone}</p>
                  <p>{shelter.addressStreet}</p>
                  <p>
                    {shelter.addressCity} - {shelter.addressState}
                  </p>
                  <p>{shelter.addressNeighborhood}</p>
                  <p>{shelter.addressZip}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

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
