import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense, type PropsWithChildren } from "react";
import { getServerAuthSession } from "~/server/auth";

export default async function ShelterLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/signin?callbackUrl=/user/shelters/create");
  }

  return (
    <Suspense
      fallback={
        <div className="flex w-full justify-center pt-28">
          <Loader2 className="size-8 animate-spin" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
