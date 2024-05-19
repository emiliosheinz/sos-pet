"use client";

import { type ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";

type SignInProviderButtonProps = {
  provider: ClientSafeProvider;
  callbackUrl: string;
};

export function SignInProviderButton({
  provider,
  callbackUrl,
}: SignInProviderButtonProps) {
  return (
    <button
      type="button"
      className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 ring-offset-white transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
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
