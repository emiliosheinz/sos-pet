import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <div className="mt-8 flex w-full justify-center border-t-2 border-slate-300/25 bg-inherit px-4 py-8 align-middle xl:px-0">
      <div className="flex w-full max-w-7xl flex-col justify-center md:flex-row md:justify-between">
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
          <Image
            src="/logo-horizontal.svg"
            width={80}
            height={50}
            alt="logo sos pet"
          />
          <FaInstagram size={20} />
        </div>
        <div className="flex flex-col gap-1 text-center align-middle md:flex-row md:gap-8">
          <a
            href="mailto:sospet.suporte@gmail.com"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Suporte: sospet.suporte@gmail.com
          </a>
          <a className="text-sm text-gray-500 hover:text-gray-700">
            Termos de uso
          </a>
          <a className="text-sm text-gray-500 hover:text-gray-700">
            Políticas de privacidade
          </a>
        </div>
      </div>
    </div>
  );
}
