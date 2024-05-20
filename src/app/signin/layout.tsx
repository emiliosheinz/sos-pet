import { type PropsWithChildren } from "react";

export default function SignInVerifyLayout({ children }: PropsWithChildren) {
  return (
    <div className="m-auto flex w-full max-w-lg flex-col items-center justify-center gap-5 p-5 pt-28">
      {children}
    </div>
  );
}
