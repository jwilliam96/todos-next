"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { authenticate, gitHubAuth, googleAuth } from "@/actions"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { IoLogoGithub } from "react-icons/io5"

interface Inputs {
    email: string
    password: string
}

export function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

    const [error, setError] = useState("")

    const submit: SubmitHandler<Inputs> = async (data) => {

        const res = await authenticate(data)

        if (res) { setError(res) }
    }

    const google = async () => {
        await googleAuth()
    }

    const gitHub = async () => {
        await gitHubAuth()
    }

    return (
        <>
            <form onSubmit={handleSubmit(submit)} className="w-full flex flex-col  gap-3 ">
                {error && (
                    <span className="text-red-500 bg-red-200 p-2 border-[1px] border-red-500">{error}</span>
                )}
                <label htmlFor="email">Email</label>
                <input id="email" type="email" {...register("email", { required: true })} placeholder="user@gmail.com" className="p-2 text-Light-text-input" />
                {errors.email && (
                    <span className="text-red-500"> Email required </span>
                )}

                <label htmlFor="password">Password</label>
                <input id="password" type="password" {...register("password", { required: true })} placeholder="*******" className="p-2 text-Light-text-input" />
                {errors.password && (
                    <span className="text-red-500"> password required </span>
                )}

                <button className="mt-4 p-2 bg-sky-900 font-bold text-white">Login</button>

            </form>
            {/* SEPARADOR */}
            <div className="flex py-4 items-center">
                <div className="w-full bg-gray-50 rounded-full h-1" />
                <span className=" text-center px-3 "> O </span>
                <div className="w-full bg-gray-50 rounded-full  h-1" />
            </div>

            {/* PROVIDERS */}
            <div className="flex mb-8 gap-4">
                <div
                    onClick={google}
                    className="flex items-center justify-center gap-2 py-2 w-full bg-slate-100 rounded-lg shadow-2xl cursor-pointer hover:scale-105 border border-gray-700">
                    <FcGoogle size={30} />
                    <span className="text-xl font-bold text-gray-600"> Google</span>
                </div>
                <div
                    onClick={gitHub}
                    className="flex items-center justify-center gap-2 py-2 w-full bg-black  rounded-lg shadow-2xl cursor-pointer hover:scale-105 border border-gray-700">
                    <IoLogoGithub size={30} />
                    <span className="text-xl font-bold text-slate-300 "> GitHub</span>
                </div>
            </div>
        </>
    )
}