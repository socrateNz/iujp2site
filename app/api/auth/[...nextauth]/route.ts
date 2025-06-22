// import NextAuth, { NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import clientPromise from '@/lib/mongodb';
// import { User } from '@/lib/types';

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Mot de passe', type: 'password' }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         try {
//           const client = await clientPromise;
//           const db = client.db();

//           const user = await db.collection('users').findOne({
//             email: credentials.email
//           }) as User | null;

//           if (!user) return null;

//           const isPasswordValid = credentials.password === user.password;
//           if (!isPasswordValid) return null;

//           return {
//             id: user._id?.toString() || '',
//             email: user.email,
//             name: user.name,
//             role: user.role,
//           };
//         } catch (error) {
//           console.error('Erreur authentification:', error);
//           return null;
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: 'jwt',
//     maxAge: 24 * 60 * 60,
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//         token.name = user.name;
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = {
//         ...session.user,
//         id: token.id as string,
//         role: token.role as 'admin' | 'user',
//         name: token.name as string,
//         email: token.email as string,
//       };
//       return session;
//     }
//   },
//   pages: {
//     signIn: '/login-admin',
//     error: '/login-admin',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// // 👇 Ceci est correct :
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };