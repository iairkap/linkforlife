import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { postUserRegistration } from "../utils/postUserRegistration";
import { generateToken } from "../utils/generateToken";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/auth?prompt=consent&access_type=offline&response_type=code",
      scope:
        "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/contacts.readonly",
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id + "",
          email: user.email,
          name: user.name,
          randomKey: "kjdfdladjfldafjadl",
        };
      },
    }),
  ],
  callbacks: {
    session: function ({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
          lastName: token.lastName, // Aquí usamos 'token', no 'user'
          partnerName: token.partnerName, // Aquí usamos 'token', no 'user'
          partnerLastName: token.partnerLastName, // Aquí usamos 'token', no 'user'
        },
        accessToken: token.accessToken,
      };
    },
    jwt: async ({ token, user, account }) => {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }

      // Si 'user' está definido, entonces estamos en el proceso de inicio de sesión
      // y podemos agregar los datos adicionales al token.
      if (user) {
        token.lastName = user.lastName;
        token.partnerName = user.partnerName;
        token.partnerLastName = user.partnerLastName;
      }

      return token;
    },
  },
  events: {
    async signIn(message) {
      await postUserRegistration(message);
    },
  },
};

export default NextAuth(authOptions);
export { authOptions };
