import { IoHomeSharp } from "react-icons/io5";
import { LoginForm } from "@/components";
import Link from "next/link";
import { Suspense } from "react";


export const metadata = {
    title: 'Login User',
    description: 'login del usuario',
};

export default function LoginPage() {
    return (
        <article className="flex justify-center min-h-screen bg-Dark-fondo px-4 pb-32">
            <div className="max-w-[400px] w-full mt-20">
                <Link href="/">
                    <div className="flex gap-2 items-center mb-4 hover:text-sky-500 cursor-pointer">
                        <IoHomeSharp size={30} />
                        <h2>Home</h2>
                    </div>
                </Link>
                <h2 className="text-center text-3xl mb-4"> Login</h2>
                <LoginForm />

                <Link href="/auth/register"><span className="block text-center p-3 bg-gray-500">Register</span></Link>
            </div>
        </article>
    );
}