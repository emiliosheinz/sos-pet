"use client";

import Image from "next/image";
import { Nav } from "./nav";
import { Sidebar } from "./sidebar";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white py-4 text-black">
      <div className="mx-auto flex items-center gap-3 px-4 lg:justify-between">
        <Sidebar />

        <div className="flex items-center gap-14">
          <div className="text-xl font-bold">
            <a href="/">
              <Image
                src="/logo-horizontal.svg"
                alt="Logo"
                width={150}
                height={100}
              />
            </a>
          </div>

          <ul className="hidden space-x-8 lg:flex">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">Sobre</Link>
            </li>
          </ul>
        </div>

        <Nav />
      </div>
    </header>
  );
}

export default Header;
