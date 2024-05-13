"use client";

import { api } from "~/trpc/react";

export default function ShelterPage({ params }: { params: { id: string } }) {
  const { data, isLoading } = api.shelter.findById.useQuery({ id: params.id });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!data) {
    return <div>Not found</div>;
  }

  return (
    <main className="flex w-full items-center justify-center bg-white px-3 py-6">
      <div className="flex w-full max-w-7xl flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Abrigo</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Informações</h2>
            <div className="flex flex-col gap-2">
              <span>Nome: {data.name}</span>
              <span>Telefone: {data.phone}</span>
              <span>Capacidade: {data.capacity}</span>
              <span>Ocupação: {data.occupancy}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Endereço</h2>
            <div className="flex flex-col gap-2">
              <span>
                {data.addressStreet}, {data.addressNumber}
                {data.addressComplement && `, ${data.addressComplement}`}
              </span>
              <span>
                {data.addressNeighborhood}, {data.addressCity} -{" "}
                {data.addressState}
              </span>
              <span>CEP: {data.addressZip}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Redes sociais</h2>
            <div className="flex flex-col gap-2">
              <span>Twitter: {data.twitter}</span>
              <span>Instagram: {data.instagram}</span>
              <span>Facebook: {data.facebook}</span>
              <span>Website: {data.website}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
