import Image from "next/image";
import { Nav } from "./nav";
import { Sidebar } from "./sidebar";
import Link from "next/link";
import { Button } from "../ui/button";
import { FaMapMarkerAlt } from "react-icons/fa";

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
              <FaMapMarkerAlt className="size-3.5 animate-bounce text-red-600" />
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
