"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Mobile Menu Icon */}

        <Sheet>
          <SheetTrigger>
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="text-xl font-bold text-black">SOS Pet</div>
        {/* Desktop Menu */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-white">
                Link 1
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Link 2
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Link 3
              </a>
            </li>
            {/* Add more menu items as needed */}
          </ul>
        </nav>
      </div>
      {/* Mobile Sidebar Menu */}
    </header>
  );
}

export default Header;
