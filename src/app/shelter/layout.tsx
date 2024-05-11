import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";
import { getServerAuthSession } from "~/server/auth";

export default async function ShelterLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/shelter");
  }
  return children;
}
