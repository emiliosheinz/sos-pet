import { createContext, useContext } from "react";
import { type z } from "zod";
import { type shelterSchema } from "~/schemas/shelter";

type ShelterContextState = {
  shelter: z.infer<typeof shelterSchema> | null;
};

const ShelterContext = createContext<ShelterContextState | null>(null);

export function ShelterContextProvider({
  children,
  shelter,
}: {
  children: React.ReactNode;
  shelter: z.infer<typeof shelterSchema> | null;
}) {
  return (
    <ShelterContext.Provider value={{ shelter }}>
      {children}
    </ShelterContext.Provider>
  );
}

export function useShelterContext() {
  const context = useContext(ShelterContext);
  if (!context) {
    throw new Error(
      "useShelterContext must be used within a ShelterContextProvider",
    );
  }
  return context;
}
