import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex w-full content-center items-center bg-white">
      {session && <h2>Olá, {session.user.name}</h2>}
      {!session && (
        <Button>
          <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
            Login
          </Link>
        </Button>
      )}
    </main>
  );
}
