"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import { CiMenuBurger } from "react-icons/ci";
import Image from "next/image";
import { Nav } from "./nav";

export function Header() {
  return (
    <header className="bg-white py-4">
      <div className="container mx-auto flex items-center gap-3 lg:justify-between">
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <CiMenuBurger size={24} />
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="text-xl font-bold">
          <a href="#" className="text-black">
            <Image
              src="/logo-horizontal.svg"
              alt="Logo"
              width={150}
              height={100}
            />
          </a>
        </div>
        <nav className="hidden lg:block">
          <Nav />
        </nav>
      </div>
    </header>
  );
}

export default Header;
