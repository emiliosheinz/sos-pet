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
        <SheetTrigger asChild aria-label="Menu">
          <Button variant="link" className="p-2">
            <CiMenuBurger size={22} />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <div className="flex flex-col items-center justify-center pt-4">
            <div className="mb-4">
              <User onClick={handleCloseSidebar} />
            </div>
            <ul className="flex w-full flex-col items-center justify-center space-y-4 text-black">
              <li>
                <Button asChild>
                  <Link href="/shelter">Cadastrar abrigo</Link>
                </Button>
              </li>
              <li className="pt-1">
                <Button asChild variant="link">
                  <Link onClick={handleCloseSidebar} href="/">
                    Home
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild variant="link">
                  <Link onClick={handleCloseSidebar} href="/about">
                    Sobre
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild variant="link">
                  <Link onClick={handleCloseSidebar} href="/map">
                    Mapa
                  </Link>
                </Button>
              </li>
              {!!session && (
                <>
                  <Separator className="mb-3" />
                  <li>
                    <Button asChild variant="link">
                      <Link onClick={handleCloseSidebar} href="/shelter">
                        Meu abrigo
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="link"
                      onClick={async () => {
                        await signOut();
                        handleCloseSidebar();
                      }}
                    >
                      Sair
                    </Button>
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
