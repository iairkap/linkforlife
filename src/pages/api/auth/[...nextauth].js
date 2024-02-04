import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { postUserRegistration } from "../utils/postUserRegistration";
import { generateToken } from "../utils/generateToken";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (user && (await compare(credentials.password, user.password))) {
          return {
            id: user.id,
            email: user.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      console.log(user);
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session(session, token) {
      session.id = token.id;
      return session;
    },
  },
  events: {
    async signIn(message) {
      await postUserRegistration(message);
    },
  },
});
