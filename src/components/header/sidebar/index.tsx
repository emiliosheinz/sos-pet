"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Separator } from "~/components/ui/separator";

import { Button } from "~/components/ui/button";

import { CiMenuBurger } from "react-icons/ci";
import { User } from "../user";
import Link from "next/link";

export function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex items-center lg:hidden">
      <Sheet>
        <SheetTrigger className="p-1">
          <CiMenuBurger size={24} />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <div className="flex flex-col items-center justify-center pt-4">
            <div className="mb-4">
              <User />
            </div>
            <ul className="flex w-full flex-col items-center justify-center space-y-4">
              <li>
                <Button onClick={() => router.push("/shelter")}>
                  Criar abrigo
                </Button>
              </li>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">Sobre</Link>
              </li>
              {session && (
                <>
                  <li>
                    <Separator className="mb-3" />
                    <Link href="/shelters">Meus abrigos</Link>
                  </li>
                  <li>
                    <Link href="/" onClick={() => signOut()}>
                      Sair
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
