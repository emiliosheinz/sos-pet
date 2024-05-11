"use client";

import Image from "next/image";
import { Nav } from "./nav";
import { Sidebar } from "./sidebar";

export function Header() {
  return (
    <header className="bg-white py-4">
      <div className="container mx-auto flex items-center gap-3 lg:justify-between">
        <Sidebar />
        <div className="text-xl font-bold">
          <a href="/" className="text-black">
            <Image
              src="/logo-horizontal.svg"
              alt="Logo"
              width={150}
              height={100}
            />
          </a>
        </div>
        <Nav />
      </div>
    </header>
  );
}

export default Header;
