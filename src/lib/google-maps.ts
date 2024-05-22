import axios from "redaxios";
import { env } from "~/env";

type CoordinatesParams = {
  street: string;
  number: string;
  city: string;
  state: string;
};

type GeocodeResponse = {
  results: Array<{
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
};

const coordinates = async ({
  city,
  number,
  state,
  street,
}: CoordinatesParams) => {
  const response = await axios.get<GeocodeResponse>(
    `https://maps.googleapis.com/maps/api/geocode/json`,
    {
      params: {
        address: `${street} ${number}, ${city} - ${state}`,
        key: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    },
  );

  const { lat, lng } = response.data?.results?.[0]?.geometry.location ?? {};

  return { lat, lng };
};

export const googleMaps = {
  coordinates,
};
