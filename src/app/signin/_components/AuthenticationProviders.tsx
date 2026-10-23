"use client";

import { getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import { SignInProviderButton } from "./SignInProviderButton";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { FiAlertTriangle } from "react-icons/fi";
import { Skeleton } from "~/components/ui/skeleton";

type GetProvidersState = "idle" | "loading" | "success" | "error";

type AuthenticationProvidersProps = {
  callbackUrl?: string;
};

/**
 * Prevents multiple calls to getProviders during one session
 */
let cachedProviders: Awaited<ReturnType<typeof getProviders>> = null;
async function getCachedProviders() {
  if (!!cachedProviders) return cachedProviders;
  return (cachedProviders = await getProviders());
}

export function AuthenticationProviders({
  callbackUrl,
}: AuthenticationProvidersProps) {
  const [providers, setProviders] =
    useState<Awaited<ReturnType<typeof getProviders>>>();
  const [getProvidersState, setGetProvidersState] =
    useState<GetProvidersState>("idle");

  useEffect(() => {
    setGetProvidersState("loading");
    getCachedProviders()
      .then((providers) => {
        setProviders(providers);
        setGetProvidersState("success");
      })
      .catch(() => {
        setGetProvidersState("error");
      });
  }, []);

  if (["loading", "idle"].includes(getProvidersState)) {
    return (
      <div className="mt-5 flex w-full flex-col gap-5">
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (getProvidersState === "error") {
    return (
      <Alert variant="destructive">
        <FiAlertTriangle className="h-4 w-4" />
        <AlertTitle>Erro ao carregar provedores de login</AlertTitle>
        <AlertDescription>
          <span>Por favor, entre em contato com o nosso suporte em&nbsp;</span>
          <a href="mailto:sospet.suport@gmail.com">sospet.suport@gmail.com</a>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="mt-5 w-full">
      {Object.values(providers ?? {}).map((provider) => (
        <SignInProviderButton
          key={provider.id}
          provider={provider}
          callbackUrl={callbackUrl ?? "/"}
        />
      ))}
    </div>
  );
}
