import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { FiAlertTriangle } from "react-icons/fi";
import { AuthenticationProviders } from "./_components/AuthenticationProviders";

type SignInPageProps = {
  searchParams: Record<string, string>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const session = await getServerAuthSession();

  if (session) {
    redirect(searchParams.callbackUrl ?? "/");
  }

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
      <AuthenticationProviders />
    </Suspense>
  );
}
