// --- Next-Auth ---
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
// --- Prisma ---
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "./prisma"
// --- Bcrypt ---
import bcrypt from "bcrypt"
// import { AdapterUser } from "next-auth/adapters"
// import { JWT } from "next-auth/jwt"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        // ----- Get & Check User -----
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials")
        }

        // ----- Check Password -----
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials")
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        // @ts-ignore:next-line
        session.user.id = token.id
        // @ts-ignore:next-line
        session.user.name = token.name
        // @ts-ignore:next-line
        session.user.email = token.email
        // session.user.image = token.image
      }
      return session
    },
    // @ts-ignore:next-line
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          // @ts-ignore:next-line
          email: token.email,
        },
      })
      if (!dbUser) {
        if (user) {
          token.id = user?.id
          // token.image = user.image
        }
        return token
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        // picture: dbUser.image,
      }
    },
    async redirect() {
      // ----- Redirect after login -----
      return "/stores"
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}
