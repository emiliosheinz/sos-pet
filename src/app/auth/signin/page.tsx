import { Sign } from "crypto";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { SigninProviderButton } from "./_components/SigninProviderButton";
import Image from "next/image";
import { Card } from "~/components/ui/card";

export default async function SigninPage(props: {
  children: React.ReactNode;
  searchParams: Record<string, string>;
}) {
  const { searchParams } = props;
  const session = await getServerAuthSession();

  if (session) {
    redirect(searchParams.callbackUrl ?? "/");
  }

  const providers = (await getProviders()) ?? [];

  return (
    <div className="flex flex-col items-center justify-center gap-5 pt-28">
      <Image src="/logo-horizontal.svg" alt="Logo" width={150} height={100} />
      <p className="max-w-md text-center">
        Em decorrência das enchentes que afetaram o estado do Rio Grande do Sul,
        estamos gerenciando as necessidades de abrigos de animais vítimas do
        desastre.
        <br></br>
        <br></br>
        Antes de <b>cadastrar um abrigo</b> você precisa <b>fazer login</b> com
        uma das opções abaixo:
      </p>
      <div className="w-full max-w-md p-5">
        {Object.values(providers).map((provider) => (
          <SigninProviderButton key={provider.id} provider={provider} />
        ))}
      </div>
    </div>
  );
}
