import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";

// Re-export the auth function
export const auth = async (options?: AuthOptions) => {
  const { auth } = NextAuth(options);
  return auth();
};
