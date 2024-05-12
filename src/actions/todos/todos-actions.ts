"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma-client"
import { Todo } from "@prisma/client"
import { auth } from "@/auth"
import { Session } from "next-auth"

interface Inputs {
    title: string
    description: string
}
interface UserTodos {
    user: Session
    todos: Todo[]
}


//GET TODOS BY ID
export const todosById = async (): Promise<UserTodos | null> => {
    const user = await auth()
    if (!user) return null

    const todos = await prisma.todo.findMany({ where: { userId: user.user.id } })

    // ORDENA LOS TODOS POR MENOS A MAYOR
    const todoOrder = todos.sort((a: any, b: any) => {
        if (a.order === b.order) {
            return b.createdAt - a.createdAt
        }
        return a.order - b.order
    })
    return { user, todos: todoOrder }
}

// CREATE TODO
export const createTodo = async ({ title, description }: Inputs) => {
    try {
        const session = await auth()
        if (!session) {
            return null
        }
        const todos = await prisma.todo.create({ data: { title, description, userId: session.user.id } })
    }
    catch (error) {
        return { message: error }
    }
    revalidatePath("/todos")
}

// DELETE TODO
export const deleteTodo = async (id: string) => {
    try {
        const todo = await prisma.todo.delete({ where: { id } })
    } catch (error) {
        return { message: error }
    }
    revalidatePath("/todos")
}

// UPDATE TODO
export const updateTodo = async (id: string, { title, description }: Inputs) => {
    try {
        const todos = await prisma.todo.update({ where: { id }, data: { title, description } })
    } catch (error) {
        return { message: error }
    }
    revalidatePath("/todos")
}

// UPDATE ORDER

export const updateOrder = async (id: string, order: number) => {
    try {
        const todos = await prisma.todo.update({ where: { id }, data: { order } })

    } catch (error) {
        return { message: error }
    }
    revalidatePath("/todos")
}

// COMPLETED
export const completedTodo = async (id: string, completed: boolean) => {
    try {
        const completedTodo = await prisma.todo.update({ where: { id }, data: { completed } })
    } catch (error) {
        return { message: error }
    }
    revalidatePath("/todos")
}

// ALL COMPLETED
export const allCompleted = async () => {
    try {
        const todos = await prisma.todo.deleteMany({ where: { completed: true } })

    } catch (error) {
        return { message: error }
    }
    revalidatePath("/todos")
}