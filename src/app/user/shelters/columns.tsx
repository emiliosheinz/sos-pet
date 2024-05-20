"use client";

import Link from "next/link";
import { type z } from "zod";
import { type shelterSchema } from "~/schemas/shelter";
import { type ColumnDef } from "@tanstack/react-table";
import { FiEdit } from "react-icons/fi";

export type ShelterTable = z.infer<typeof shelterSchema>;

export const columns: ColumnDef<ShelterTable>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "address",
    header: "Endereço",
    cell: ({ row }) => {
      const shelter = row.original;

      return (
        <a className="text-sm text-gray-500">
          <p className="font-bold text-black">
            {shelter.address.street}, {shelter.address.number},{" "}
            {shelter.address.neighborhood}
          </p>
          <p>
            {shelter.address.city} / {shelter.address.state}
          </p>
        </a>
      );
    },
  },
  {
    accessorKey: "Vagas",
    header: "Capacidade",
    cell: ({ row }) => {
      const shelter = row.original;

      return (
        <div>
          <p className="text-gray-500">
            Capacidade total:{" "}
            <span className="font-bold text-black">{shelter.capacity}</span>
          </p>
          <p className="text-gray-500">
            Ocupação:{" "}
            <span className="font-bold text-black">{shelter.occupancy}</span>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const shelter = row.original;

      return (
        <div>
          <Link href={`/user/shelters/${shelter.id}/edit`}>
            <span className="sr-only">Editar</span>
            <FiEdit size={20} className="cursor-pointer" />
          </Link>
        </div>
      );
    },
  },
];
