"use client";
import { useRouter } from "next/navigation";

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

import { CiCircleChevDown } from "react-icons/ci";

export function Nav() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="hidden lg:block">
      <ul className="flex space-x-4">
        <li>
          <Button onClick={() => router.push("/shelter")} className="mr-2">
            Criar abrigo
          </Button>
        </li>
        {session && (
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center gap-2">
                <User />
                <CiCircleChevDown size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link className="w-full" href="/shelter">
                    Meu abrigo
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link className="w-full" href="/" onClick={() => signOut()}>
                    Sair
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        )}
        {!session && (
          <li>
            <User />
          </li>
        )}
      </ul>
    </nav>
  );
}
