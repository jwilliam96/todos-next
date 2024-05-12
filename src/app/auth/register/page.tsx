import { RegisterForm } from "@/components";
import Link from "next/link";
import { IoHomeSharp } from "react-icons/io5";


export const metadata = {
    title: 'Register User',
    description: 'registro del usuario',
};

export default function RegisterPage() {
    return (
        <article className="flex justify-center min-h-screen bg-Dark-fondo px-4">
            <div className="max-w-[400px] w-full mt-8 mb-20 ">
                <Link href="/">
                    <div className="flex gap-2 items-center mb-4 hover:text-sky-500 cursor-pointer">
                        <IoHomeSharp size={30} />
                        <h2>Home</h2>
                    </div>
                </Link>
                <h2 className="text-center text-3xl mb-4"> Register</h2>

                {/* FORMULARIO */}
                <RegisterForm />

                <div className="flex py-4 items-center">
                    <div className="w-full bg-gray-50 rounded-full h-1" />
                    <span className=" text-center px-3"> O </span>
                    <div className="w-full bg-gray-50 rounded-full h-1" />
                </div>
                <Link href="/auth/login"><span className="block text-center p-3 bg-gray-500">Login</span></Link>
            </div>
        </article>
    );
}