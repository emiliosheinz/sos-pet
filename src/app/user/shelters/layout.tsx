"use client";

import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { type PropsWithChildren } from "react";

export default function ShelterLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (!session) {
    redirect(`/signin?callbackUrl=${pathname}`);
  }

  return children;
}
