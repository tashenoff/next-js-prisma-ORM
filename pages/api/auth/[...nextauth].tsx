import { NextApiHandler } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from 'next-auth/providers/github';
import prisma from "../../../prisma/client"; // Импорт prisma

export const options: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma), // Используем PrismaAdapter с настроенным экземпляром Prisma
  secret: process.env.SECRET!, // Секретный ключ для NextAuth
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
