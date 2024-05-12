import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { type NextAuthConfig } from 'next-auth'
import prisma from './lib/prisma-client';
import bcryptjs from "bcryptjs"
import { z } from 'zod';

export const authConfig = {

    pages: {
        signIn: '/auth/login',
        newUser: "/auth/register"
    },
    callbacks: {

        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/todos');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/todos', nextUrl));
            }
            return true;
        },
    },

    providers: [
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null

                const { email, password } = parsedCredentials.data

                // BUSCAR CORREO
                const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
                if (!user) throw new Error("No user found")

                // COMPARAR LAS CONTRASEÑAS
                const passCompare = !!bcryptjs.compareSync(password, user.password as string)
                if (!passCompare) throw new Error("wrong password")

                // REGRESAR EL USUARIO
                const { password: _, ...resto } = user
                return resto
            },

        }),],


} satisfies NextAuthConfig