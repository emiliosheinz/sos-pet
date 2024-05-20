import Image from "next/image";
import { Nav } from "./nav";
import { Sidebar } from "./sidebar";
import Link from "next/link";
import { Button } from "../ui/button";

export function Header() {
  const renderMainSection = () => (
    <div className="flex w-full flex-1 items-center gap-14">
      <div className="text-xl font-bold">
        <Link href="/">
          <Image
            src="/logo-horizontal.svg"
            alt="Logo"
            width={130}
            height={25}
          />
        </Link>
      </div>
      <ul className="hidden space-x-4 lg:flex">
        <li>
          <Button asChild variant="link">
            <Link href="/">Home</Link>
          </Button>
        </li>
        <li>
          <Button asChild variant="link">
            <Link href="/about">Sobre</Link>
          </Button>
        </li>
        <li>
          <Button asChild variant="link">
            <Link className="flex items-center gap-1" href="/map">
              Mapa
              <span className="relative mb-3 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
              </span>
            </Link>
          </Button>
        </li>
      </ul>
    </div>
  );

  return (
    <header className="bg-white py-4 text-black">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-2 lg:justify-between">
        <Sidebar />
        {renderMainSection()}
        <Nav />
      </div>
    </header>
  );
}

export default Header;
