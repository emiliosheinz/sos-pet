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
    accessorKey: "formattedAddress",
    header: "Endereço",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const shelter = row.original;

      return (
        <div>
          <Link href={`/shelter/${shelter.id}/edit`}>
            <span className="sr-only">Editar</span>
            <FiEdit size={20} className="cursor-pointer" />
          </Link>
        </div>
      );
    },
  },
];
