"use server"

import prisma from "@/lib/prisma-client"
import bcryptjs from "bcryptjs"

interface Props {
    name: string
    email: string
    password: string
}

// CREATE USER CREDENTIAL

export const createUser = async ({ name, email, password }: Props) => {
    try {
        const data = { name, email, password }
        data.email = data.email.toLowerCase()
        data.password = bcryptjs.hashSync(password)

        const users = await prisma.user.create({ data })
        const { password: _, ...rest } = users

        return { ok: true, user: rest }

    } catch (error) {
        return { ok: false, message: "Email already exists" }
    }
}
