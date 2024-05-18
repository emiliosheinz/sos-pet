"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

type SignInProviderButtonProps = {
  provider: { id: string; name: string };
  callbackUrl: string;
};

export function SignInProviderButton({
  provider,
  callbackUrl,
}: SignInProviderButtonProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white p-3 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      onClick={() => signIn(provider.id, { callbackUrl })}
    >
      <Image
        src={`/${provider.id}.svg`}
        alt={`Icone de ${provider.name}`}
        width={32}
        height={32}
      />
      Entrar com {provider.name}
    </button>
  );
}
