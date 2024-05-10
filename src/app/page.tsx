"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <h2>Carregando...</h2>;
  }

  if (status === "authenticated") {
    return (
      <main className="flex w-full items-center justify-center bg-white pt-16">
        <h2>{session.user.name}</h2>{" "}
        <Button onClick={() => signOut()}>Sign out</Button>
      </main>
    );
  }

  return (
    <main className="flex w-full items-center justify-center bg-white pt-16">
      <h1>Home</h1>
      <Button onClick={() => signIn("google")}>Sign in</Button>
    </main>
  );
}
