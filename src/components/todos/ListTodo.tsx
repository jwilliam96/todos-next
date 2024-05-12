"use client"

import { startTransition, useOptimistic, useState } from "react"
import { completedTodo, deleteTodo } from "@/actions"
import { todoStore } from "@/store/todo-reducer"
import { MdDelete } from "react-icons/md"
import { FaCheck } from "react-icons/fa"
import { Todo } from "@prisma/client"
import Swal from "sweetalert2"
import clsx from "clsx"

interface Props {
    todo: Todo
}

export default function ListTodo({ todo }: Props) {
    // ZUSTAND STORE
    const updateState = todoStore((state) => state.updateStateG)

    // OPTIMISTIC
    const [todoOptimistic, toggleTodoOptimistic] =
        useOptimistic(todo, (state, newComplete: boolean) => ({ ...state, completed: newComplete }))

    const onToggleTodo = async () => {
        try {
            startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed))
            await completedTodo(todoOptimistic.id, !todoOptimistic.completed)

        } catch (error) {
            startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed))

        }
    }
    const { id, title, description, completed } = todoOptimistic

    // MODAL DESCRIPTION
    const [modal, setModal] = useState(false)

    // UPDATE STORE
    const handleState = () => {
        updateState({ id, title, description })
    }

    // DELETE TODO
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTodo(id)
                Swal.fire({
                    title: "Deleted!",
                    text: "Deleted task.",
                    icon: "success"
                });
            }
        });

    }

    return (
        <div>
            <div className=" flex justify-between items-center p-3 border-b-2 transition-colors duration-1000
              bg-Light-fondo-input border-Light-border
            dark:bg-Dark-fondo-input  dark:border-Dark-border">

                {/* COMPLETED */}
                <div
                    onClick={onToggleTodo}
                    className={clsx(
                        "h-7 w-7 shrink-0 rounded-full border-2 justify-center items-center cursor-pointer border-Light-border dark:border-Dark-border flex ", completed && "bg-dark-Fondo-gradient")}>
                    {completed && (
                        <FaCheck />
                    )}
                </div>

                {/* TITLE */}
                <p
                    onClick={() => setModal(!modal)}
                    className={clsx(
                        "px-2 grow text-center cursor-pointer uppercase text-ellipsis overflow-hidden text-Light-text-input transition-colors duration-1000 dark:text-Dark-text",
                        completed && "text-Light-text-completed dark:text-Dark-text-completed line-through italic"
                    )}>
                    {title}
                </p>

                {/* DELETE */}
                <MdDelete
                    size={30}
                    onClick={handleDelete}
                    className="cursor-pointer shrink-0 
                    text-Light-border dark:text-light-text-select" />
            </div>

            {/* DESCRIPTION */}
            {modal && (<p onClick={handleState}
                className={clsx("text-ellipsis text-Dark-text overflow-hidden bg-[#141559d8] p-3 text-center cursor-pointer", completed && "text-Dark-text-completed line-through italic")}>
                {description}
            </p>)}
        </div>
    )
}
