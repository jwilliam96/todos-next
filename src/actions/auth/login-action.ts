"use server"

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

interface Props {
    email: string
    password: string
}

export const authenticate = async ({ email, password }: Props) => {
    try {
        await signIn('credentials', { email: email, password: password });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.cause?.err?.message) {
                case 'No user found':
                    return error.cause?.err?.message;
                default:
                    return 'wrong password';
            }
        }
        throw error;
    }
}


export const googleAuth = async () => {
    await signIn('google',)
}

export const gitHubAuth = async () => {
    await signIn('github',)
}