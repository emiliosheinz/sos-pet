"use client";
import Image from "next/image";

import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { GoSignIn } from "react-icons/go";
import Link from "next/link";

type UserProps = {
  onClick?: () => void;
};

export function User({ onClick }: UserProps) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Button asChild variant="outline" onClick={onClick}>
        <Link href="/signin">
          <GoSignIn size={18} className="mr-2" />
          Entrar
        </Link>
      </Button>
    );
  }

  return (
    <Avatar>
      {session.user.image ? (
        <AvatarImage src={session.user.image} />
      ) : (
        <AvatarFallback>
          <Image
            src="/dog.svg"
            alt="Ícone de um cachorro"
            width={25}
            height={25}
          />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
