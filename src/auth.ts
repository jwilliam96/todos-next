import { authConfig } from './auth.config';
import prisma from './lib/prisma-client';
import NextAuth from 'next-auth';

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === 'google') {
                if (profile?.email) {
                    const verifyUser = await prisma.user.findUnique({ where: { email: profile?.email } })
                    if (verifyUser) {
                        return true
                    } else {
                        await prisma.user.create({
                            data: {
                                name: profile?.name,
                                email: profile?.email,
                            }
                        })
                    }
                }
            }
            if (account?.provider === "github") {
                if (profile?.email) {
                    const verifyUser = await prisma.user.findUnique({ where: { email: profile?.email } })
                    if (verifyUser) {
                        return true
                    } else {
                        await prisma.user.create({
                            data: {
                                name: profile?.name,
                                email: profile?.email,
                            }
                        })
                    }
                }
            }
            return true
        },
        async jwt({ token }) {
            const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? "no-email" } })
            token.id = dbUser?.id ?? "no-id"
            return token
        },
        async session({ session, token }) {

            if (session && session.user) {
                session.user.id = token.id as string
            }

            return session
        },
    },
});

