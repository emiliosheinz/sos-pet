"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex w-full flex-col  items-center justify-center gap-2 bg-white pt-16">
      {!!session && <h2>{session.user.name}</h2>}
      {!!session ? (
        <Button onClick={() => signOut()}>Sign out</Button>
      ) : (
        <Button onClick={() => signIn("google")}>Sign in</Button>
      )}
    </main>
  );
}
