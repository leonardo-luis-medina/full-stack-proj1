import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({ allowDangerousEmailAccountLinking: true }),
    Google({ allowDangerousEmailAccountLinking: true }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = (user as any).role;
      }
      return session;
    },
  },
});
