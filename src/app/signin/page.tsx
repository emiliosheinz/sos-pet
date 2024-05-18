import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { SignInProviderButton } from "./_components/SignInProviderButtonn";
import Image from "next/image";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

type SignInPageProps = {
  searchParams: Record<string, string>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const session = await getServerAuthSession();
  const providers = await getProviders();

  if (session) {
    redirect(searchParams.callbackUrl ?? "/");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 pt-28">
      <Suspense fallback={<Loader2 className="size-8 animate-spin" />}>
        <Image src="/logo-horizontal.svg" alt="Logo" width={150} height={100} />
        <p className="max-w-md text-center">
          Em decorrência das enchentes que afetaram o estado do Rio Grande do
          Sul, estamos gerenciando as necessidades de abrigos de animais vítimas
          do desastre.
          <br></br>
          <br></br>
          Antes de <b>cadastrar um abrigo</b> você precisa <b>fazer login</b>{" "}
          com uma das opções abaixo:
        </p>
        <div className="w-full max-w-md p-5">
          {Object.values(providers).map((provider) => (
            <SignInProviderButton
              key={provider.id}
              provider={provider}
              callbackUrl={searchParams.callbackUrl ?? "/"}
            />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
