"use client";
import { type LatLngTuple } from "leaflet";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

const DEFAULT_LOCATION: LatLngTuple = [-30.0346, -51.2177]; // Porto Alegre

const MapComponent = dynamic(() => import("~/components/map/"), {
  loading: () => <Skeleton className="h-[75vh] w-full max-w-7xl rounded-md" />,
  ssr: false,
});

export default function Map() {
  const { data: shelters, isLoading } = api.shelter.findAll.useQuery();
  const [userLocation, setUserLocation] =
    useState<LatLngTuple>(DEFAULT_LOCATION);

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

  return (
    <main className="relative flex w-full justify-center px-2 pt-8">
      <MapComponent userLocation={userLocation} shelter={shelters ?? []} />
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <Loader2 className="size-8 animate-spin" />
        </div>
      )}
    </main>
  );
}
