"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { authenticate, createUser } from "@/actions"
import { useState } from "react"
import clsx from "clsx"

interface Inputs {
    name: string
    email: string
    password: string
    confirmPassword: string
}
export function RegisterForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
    const [confirmPass, setConfirmPass] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<string>("")

    const submit: SubmitHandler<Inputs> = async (data) => {
        setEmailError("")
        // VALIDAR CONFIRM PASSWORD
        if (data.password !== data.confirmPassword) {
            setConfirmPass(true)
            return null
        } else { setConfirmPass(false) }

        const { confirmPassword, ...resto } = data

        // SE VALIDA PARA CREAR USUARIO
        const resp = await createUser(resto)

        if (resp.ok) {
            // SE CREA USUARIO Y LO ENVÍA AL LOGIN
            // router.push("/auth/login")
            await authenticate(data)
        } else {
            setEmailError(resp.message ?? "")
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
            {/* NAME */}
            <label htmlFor="name">Name</label>
            <input
                maxLength={15}
                placeholder="Name User"
                id="name"
                type="text" {...register("name", { required: true, minLength: 5, maxLength: 15 })}
                className={clsx("p-2 text-Dark-fondo-input", errors.name && "focus:border-red-500 focus:outline-red-500 border-[2px] border-red-500")} />
            {errors.name && (
                <span className="text-red-500">from 5 - 15 characters</span>
            )}

            {/* EMAIL */}
            <label htmlFor="email">Email</label>
            <input
                placeholder="user123@gmail.com"
                id="email"
                type="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                className={clsx("p-2 text-Dark-fondo-input", errors.email && "focus:border-red-500 focus:outline-red-500 border-[2px] border-red-500")} />

            {errors.email && (
                <span className="text-red-500">Email required</span>
            )}
            {emailError && (
                <span className="text-red-500">Email exists</span>
            )}

            {/* PASSWORD */}
            <label htmlFor="password">Password</label>
            <input placeholder="********" id="password" type="password" {...register("password", { required: true, minLength: 6 })} className={clsx("p-2 text-Dark-fondo-input", errors.password && "focus:border-red-500 focus:outline-red-500 border-[2px] border-red-500")} />
            {errors.password && (
                <span className="text-red-500">password min 6 characters</span>
            )}

            {/* CONFIRM PASSWORD */}
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input placeholder="********" id="confirmPassword" type="password" {...register("confirmPassword", { required: true, minLength: 6 })} className={clsx("p-2 text-Dark-fondo-input", (errors.confirmPassword || confirmPass) && "focus:border-red-500 focus:outline-red-500 border-[2px] border-red-500")} />
            {errors.confirmPassword && (
                <span className="text-red-500">password min 6 characters</span>
            )}
            {confirmPass && (
                <span className="text-red-500">Password does not match</span>
            )}

            <button className="bg-sky-700 p-3 mt-6">Send</button>
        </form>
    )
}
