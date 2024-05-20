import {
  type ClientSafeProvider,
  type LiteralUnion,
  getProviders,
} from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { SignInProviderButton } from "./_components/SignInProviderButton";
import Image from "next/image";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { EmailProviderForm } from "./_components/EmailProviderForm";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { FiAlertTriangle } from "react-icons/fi";

type SignInPageProps = {
  searchParams: Record<string, string>;
};

const splitProviders = (
  providers: Awaited<ReturnType<typeof getProviders>>,
): [ClientSafeProvider | null, ClientSafeProvider[]] | [null, null] => {
  if (!providers) return [null, null];
  const email = providers.email;
  const other = Object.values(providers).filter(
    (provider) => provider.id !== "email",
  );
  return [email, other];
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const [session, providers] = await Promise.all([
    getServerAuthSession(),
    getProviders(),
  ]);

  if (session) {
    redirect(searchParams.callbackUrl ?? "/");
  }

  const [emailProvider, otherProviders] = splitProviders(providers);
  const hasError = !!searchParams.error;

  return (
    <Suspense fallback={<Loader2 className="size-8 animate-spin" />}>
      <Image src="/logo-horizontal.svg" alt="Logo" width={150} height={100} />
      <p className="text-center">
        Em decorrência das enchentes que afetaram o estado do Rio Grande do Sul,
        estamos gerenciando as necessidades de abrigos de animais vítimas do
        desastre.
        <br></br>
        <br></br>
        Antes de <b>cadastrar um abrigo</b> você precisa <b>fazer login</b> com
        uma das opções abaixo:
      </p>
      {hasError && (
        <Alert variant="destructive">
          <FiAlertTriangle className="h-4 w-4" />
          <AlertTitle>Erro ao tentar realizar o login.</AlertTitle>
          <AlertDescription>
            Por favor, tente novamente com outra opção disponível.
          </AlertDescription>
        </Alert>
      )}
      <div className="w-full">
        {otherProviders?.map((provider) => (
          <SignInProviderButton
            key={provider.id}
            provider={provider}
            callbackUrl={searchParams.callbackUrl ?? "/"}
          />
        ))}
        {!!emailProvider && <EmailProviderForm />}
      </div>
    </Suspense>
  );
}
