"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { toast } from "sonner";

import { FiTrash } from "react-icons/fi";
import { useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function DialogDelete({ shelterUuid }: { shelterUuid: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const deleteShelter = api.userShelters.delete.useMutation({
    onSuccess: () => {
      toast.success("Abrigo excluído com sucesso!");
      router.replace("/user/shelters");
      setOpen(false);
    },
    onError: (error) => {
      setOpen(false);
      toast.error("Ops! Houve um erro ao excluir o abrigo.");
      console.error(error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="destructive">
          <FiTrash className="mr-2" />
          Excluir
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atenção</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja excluir este abrigo? Esta ação não pode
            ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={() => {
              deleteShelter.mutate({ uuid: shelterUuid });
            }}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
