import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import type { NextAuthConfig } from "next-auth";

// This is required for static export
export const dynamic = "force-static";
export const revalidate = false;

// Generate static paths for build time
export async function generateStaticParams() {
  return [{ nextauth: ['session', 'signin', 'signout'] }];
}

// Mock user database - in a real app, this would be your MongoDB connection
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@rootthings.com",
    password: "password123", // In a real app, this would be hashed
    image: "/images/avatar-1.jpg",
  },
];

export const authOptions: NextAuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate the credentials
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          // In a real app, you would query your database here
          const user = users.find(
            (user) => user.email === email && user.password === password
          );
          
          if (!user) return null;
          
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        }
        
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        return {
          ...token,
          userId: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token?.userId && session.user) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-for-development-only",
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
