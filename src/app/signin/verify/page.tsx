import { FaRegCheckCircle } from "react-icons/fa";

export const dynamic = "force-static";
export const revalidate = 60 * 60 * 24;

export default function SignInVerifyPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 pt-28">
        <FaRegCheckCircle className="text-6xl text-green-500" />
        <h1 className="text-center text-2xl font-bold">
          E-mail enviado com sucesso
        </h1>
        <p className="max-w-md text-center">
          Enviamos um e-mail com um link para você verificar sua conta. Por
          favor, <b>verifique sua caixa de entrada</b> para continuar com o
          processo de login.
        </p>
      </div>
    </>
  );
}
