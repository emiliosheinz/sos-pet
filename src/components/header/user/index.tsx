"use client";
import Image from "next/image";

import { useSession, signIn } from "next-auth/react";

import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import Link from "next/link";

const RenderLoginButton = ({
  isLogged,
  children,
}: {
  isLogged: boolean;
  children: React.ReactNode;
}) => {
  if (!isLogged) {
    return (
      <Link href="/" onClick={() => signIn("google")}>
        {children}
      </Link>
    );
  }

  return children;
};

export function User() {
  const { data: session } = useSession();

  const renderAvatarImage = () => {
    if (session?.user.image) {
      return <AvatarImage src={session.user.image} />;
    }

    return (
      <AvatarFallback>
        <Image
          src={"/dog.svg"}
          alt="Ícone de um cachorro"
          width={25}
          height={25}
        />
      </AvatarFallback>
    );
  };

  const renderUserInfo = () => {
    if (session?.user.name) {
      return `Olá, ${session.user.name}`;
    }

    return "Olá, faça seu login";
  };

  return (
    <RenderLoginButton isLogged={!!session}>
      <div className="flex items-center gap-2">
        <Avatar>{renderAvatarImage()}</Avatar>
        <div className="flex items-center">{renderUserInfo()} </div>
      </div>
    </RenderLoginButton>
  );
}
