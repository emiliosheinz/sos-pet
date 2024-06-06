import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { type LatLngTuple } from "leaflet";
import { type Shelter } from "@prisma/client";
import { ShelterCard } from "../shelter-card";

function UserLocationMap({ userLocation }: { userLocation: LatLngTuple }) {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView(userLocation, 13);
    }
  }, [userLocation, map]);

  return null;
}

export default function Map({
  userLocation,
  shelter,
}: {
  userLocation: LatLngTuple;
  shelter: Shelter[];
}) {
  return (
    <MapContainer
      style={{
        height: "75vh",
        width: "100%",
        maxWidth: "1280px",
        borderRadius: "16px",
      }}
      center={userLocation}
      zoom={13}
    >
      <UserLocationMap userLocation={userLocation} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {shelter?.map((shelter) => {
        if (!shelter.latitude || !shelter.longitude) return null;

        return (
          <Marker
            key={shelter.id}
            position={[shelter.latitude, shelter.longitude]}
          >
            <Popup minWidth={390}>
              <ShelterCard
                shelter={shelter}
                className="border-none p-2 text-black shadow-none"
              />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
