"use client";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Separator } from "~/components/ui/separator";

import { Button } from "~/components/ui/button";

import { CiMenuBurger } from "react-icons/ci";
import { User } from "../user";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleCloseSidebar = () => {
    setOpen(false);
  };

  return (
    <div className="flex items-center lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="p-1">
          <CiMenuBurger size={24} />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <div className="flex flex-col items-center justify-center pt-4">
            <div className="mb-8">
              <User />
            </div>
            <ul className="flex w-full flex-col items-center justify-center space-y-4 text-black">
              <li>
                <Link href="/shelter">
                  <Button>Criar abrigo</Button>
                </Link>
              </li>
              <li>
                <Link onClick={handleCloseSidebar} href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link onClick={handleCloseSidebar} href="/about">
                  Sobre
                </Link>
              </li>
              {session && (
                <>
                  <li>
                    <Separator className="mb-3" />
                    <Link href="/shelter">Meu abrigo</Link>
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
