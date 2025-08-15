import clientPromise from "@/lib/mongodb";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

export async function loginUser(credentials: { email: string; password: string }) {
  const client = await clientPromise;
  const db = client.db();

  const user = await db.collection('users').findOne({ email: credentials.email });

  if (!user) return null;

  const isPasswordValid = credentials.password === user.password;
  if (!isPasswordValid) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Vérifie que credentials n'est pas undefined avant de l'utiliser
        if (!credentials) {
          return null;
        }
        const user = await loginUser(credentials);

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Étend la session avec le rôle
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  // optionnel
  pages: {
    signIn: '/login-admin',
    error: '/auth/error',
  },
};