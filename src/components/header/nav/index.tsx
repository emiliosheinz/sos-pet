"use client";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { CiCircleChevDown } from "react-icons/ci";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function Nav() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <ul className="flex space-x-4">
      <li>
        <Button onClick={() => router.push("/shelter")} className="mr-2">
          Criar abrigo
        </Button>
      </li>
      <li>
        {session && (
          <div className="flex items-center justify-center gap-2">
            <Avatar>
              <AvatarImage src={session.user.image} />
            </Avatar>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex">
                  Olá, Fulano! <CiCircleChevDown size={30} className="pl-3" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Meus abrigos</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </li>
    </ul>
  );
}
