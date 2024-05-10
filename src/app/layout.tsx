import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

import Providers from "./providers";
import { getServerSession } from "next-auth";
import { getServerAuthSession } from "~/server/auth";
import { Toaster } from "~/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "SOS Pet",
  description:
    "Ache abrigos para animais afetados pelos alagamentos no RS próximos a você!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} p-3`}>
        <Providers session={session}>
          <TRPCReactProvider>
            {children}
            <Toaster />
          </TRPCReactProvider>
        </Providers>
      </body>
    </html>
  );
}
