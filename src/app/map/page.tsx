"use client";
import { type LatLngTuple } from "leaflet";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { api } from "~/trpc/react";

const DEFAULT_LOCATION: LatLngTuple = [-30.0346, -51.2177]; // Porto Alegre

export default function Page() {
  const { data, isLoading } = api.shelter.findAll.useQuery();
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

  const Map = useMemo(
    () =>
      dynamic(() => import("~/components/map/"), {
        loading: () => <Loader2 className="size-8 animate-spin" />,
        ssr: false,
      }),
    [],
  );

  if (isLoading && !data) {
    return (
      <div className="flex w-full justify-center pt-28">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <main className="flex w-full justify-center pt-8">
      <Map userLocation={userLocation} shelter={data ?? []} />
    </main>
  );
}
