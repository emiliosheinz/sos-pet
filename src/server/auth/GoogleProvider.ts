import GoogleProvider from "next-auth/providers/google";
import { env } from "~/env";

export function CustomGoogleProvider() {
  return GoogleProvider({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
  });
}
