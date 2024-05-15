"use client";

import { Button } from "~/components/ui/button";
import { useSession, signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Link from "next/link";
import { User } from "../user";

export function Nav() {
  const { data: session } = useSession();

  return (
    <nav>
      <ul className="flex">
        <li>
          <Button asChild className="mr-2 hidden sm:flex">
            <Link href="/shelter">Cadastrar abrigo</Link>
          </Button>
        </li>

        <li className="hidden lg:block">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="ml-2 rounded-full p-0">
                  <User />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/user/shelters">Meus abrigos</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
                >
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <User />
          )}
        </li>
      </ul>
    </nav>
  );
}
