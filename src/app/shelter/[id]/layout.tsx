import { Loader2 } from "lucide-react";
import { Suspense, type PropsWithChildren } from "react";

export default async function ShelterLayout({ children }: PropsWithChildren) {
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
