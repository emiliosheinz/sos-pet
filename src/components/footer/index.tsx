import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <div className="mt-8 flex w-full justify-center border-t-2 border-slate-300/25 bg-inherit px-4 py-8 align-middle xl:px-0">
      <div className="flex w-full max-w-7xl flex-col justify-center gap-4 md:flex-row md:justify-between">
        <div className="flex justify-center">
          <Image
            src="/logo-horizontal.svg"
            width={80}
            height={50}
            alt="logo sos pet"
          />
        </div>
        <div className="flex flex-col gap-1 text-center align-middle md:flex-row md:gap-8">
          <Link
            href="mailto:sospet.suporte@gmail.com"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Suporte: sospet.suporte@gmail.com
          </Link>
          <Link
            href="/terms-of-use"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Termos de uso
          </Link>
          <Link
            href="/privacy-policy"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Políticas de privacidade
          </Link>
        </div>
      </div>
    </div>
  );
}
