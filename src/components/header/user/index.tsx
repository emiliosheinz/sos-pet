"use client";
import Image from "next/image";

import { useSession } from "next-auth/react";

import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

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

  return <Avatar>{renderAvatarImage()}</Avatar>;
}
