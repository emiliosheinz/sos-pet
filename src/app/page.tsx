"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Card } from "~/components/card/";
import { SearchInput } from "~/components/search-input";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function Home() {
  const { data: session } = useSession();
  const { data } = api.shelter.findAll.useQuery();

  // return (
  //   <main className="flex w-full flex-col  items-center justify-center gap-2 bg-white pt-16">
  //     {!!session && <h2>{session.user.name}</h2>}
  //     {!!session ? (
  //       <Button onClick={() => signOut()}>Sign out</Button>
  //     ) : (
  //       <Button onClick={() => signIn("google")}>Sign in</Button>
  //     )}
  //   </main>
  // );
  //

  return (
    <main className="flex w-full flex-col  items-center justify-center gap-2 bg-white pt-16">
      {!!session && <h2>{session.user.name}</h2>}
      <ul>
        {data?.map((shelter) => (
          <li key={shelter.id} className="rounded-md border-2 border-black p-2">
            <div className="flex flex-col">
              <span>Name: {shelter.name}</span>
              <span>Phone: {shelter.phone}</span>
              <span>Capacity: {shelter.capacity}</span>
              <span>Occupancy: {shelter.occupancy}</span>
              <span>Donations: {shelter.donations}</span>
              <span>Volunteers: {shelter.volunteers}</span>
            </div>
          </li>
        ))}
      </ul>
      {!!session ? (
        <Button onClick={() => signOut()}>Sign out</Button>
      ) : (
        <Button onClick={() => signIn("google")}>Sign in</Button>
      )}
      <SearchInput />
      <Card />
    </main>
  );
}
