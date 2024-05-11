"use client";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { useSession, signOut } from "next-auth/react";

import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

import { CiCircleChevDown } from "react-icons/ci";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";

export function Nav() {
  const { data: session } = useSession();
  const router = useRouter();

  const renderAvatarImage = () => {
    if (session?.user.image) {
      return <AvatarImage src={session.user.image} />;
    }

    return (
      <AvatarFallback>
        <Image
          src={"/dog.svg"}
          alt="Ícone de um cachorro"
          width={25}
          height={25}
        />
      </AvatarFallback>
    );
  };

  return (
    <nav className="hidden lg:block">
      <ul className="flex space-x-4">
        <li>
          <Button onClick={() => router.push("/shelter")} className="mr-2">
            Criar abrigo
          </Button>
        </li>
        <li>
          {session && (
            <div className="flex items-center justify-center gap-2">
              <Avatar>{renderAvatarImage()}</Avatar>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center">
                    {`Olá, ${session.user.name}`}{" "}
                    <CiCircleChevDown size={30} className="pl-3" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link className="w-full" href="/profile">
                      Meus abrigos
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
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
