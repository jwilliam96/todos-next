"use client"
export const dynamic = 'force-static'

import { SubmitHandler, useForm } from "react-hook-form"
import { createTodo, updateTodo } from "@/actions"
import { todoStore } from "@/store/todo-reducer"
import { useEffect } from "react"

interface Inputs {
    title: string
    description: string
}
export function FormTodo() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>()
    const todoState = todoStore(state => state.todoStateG)
    const updateState = todoStore(state => state.updateStateG)

    useEffect(() => {

        if (todoState) {
            reset({
                title: todoState.title,
                description: todoState.description
            })
        }
    }, [todoState, reset])

    const submit: SubmitHandler<Inputs> = async (data) => {
        const { title, description } = data
        if (todoState) {
            updateTodo(todoState.id, { title, description })
            updateState(null)
        } else {
            createTodo(data)
        }
        reset({
            title: "",
            description: ""
        })

    }

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
            <label className="text-2xl pl-2" htmlFor="title">Title</label>
            <input
                type="text"
                id="title" {...register("title", { minLength: 3, required: true })}
                className="p-3 transition-colors duration-1000
                 bg-Light-fondo-input text-Light-text-input
                 dark:bg-Dark-fondo-input dark:text-Dark-text-hover" />

            {errors.title && (
                <span className="text-red-500">min 3 characters</span>
            )}

            <label className="text-2xl pl-2" htmlFor="description">Description </label>
            <input
                type="text"
                id="description" {...register("description")}
                className="p-3 transition-colors duration-1000
                 bg-Light-fondo-input text-Light-text-input
                 dark:bg-Dark-fondo-input dark:text-Dark-text-hover" />

            <button className="text-xl font-bold py-3 mt-4 rounded-md 
                    bg-light-Fondo-gradient
                    dark:bg-dark-Fondo-gradient ">
                {todoState ? "Update" : "Create"}
            </button>
        </form>
    )
}
