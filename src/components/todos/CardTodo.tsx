"use client"

import { allCompleted, updateOrder } from "@/actions";
import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { Todo } from "@prisma/client";
import ListTodo from "./ListTodo";
import Swal from "sweetalert2";
import clsx from "clsx";

interface Props {
    todos: Todo[]
}
export function CardTodo({ todos }: Props) {

    const selects = ["All", "Active", "Completed"]
    const [selectActive, setSelectActive] = useState("All")

    // FRAME MOTION ORDER DRAG AND DROP
    const [items, setItems] = useState(todos)

    useEffect(() => {
        setItems(todos)
    }, [todos])


    useEffect(() => {
        if (items !== todos) {
            items.forEach((item, index) => {
                updateOrder(item.id, index)
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])


    const deleteAllCompleted = () => {
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
                allCompleted()
                Swal.fire({
                    title: "Deleted!",
                    text: "deleted tasks.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className="flex flex-col mt-8 shadow-2xl">

            {/* SELECTORS MOBILE */}
            <ul className="sm:hidden rounded-md flex justify-center gap-6 cursor-pointer p-3  border-b-2 mb-3 transition-colors duration-1000
            bg-Light-fondo-input text-light-text-select border-Light-border
            dark:bg-Dark-fondo-input  dark:text-light-text-select dark:border-Dark-border ">
                {selects.map((select, i) => (
                    <li
                        onClick={() => setSelectActive(select)}
                        className={clsx(
                            "hover:text-Text-Active",
                            selectActive === select && "text-Text-Active underline")}
                        key={select[i]}>
                        {select}
                    </li>
                ))}
            </ul>

            {/* ALL SELECTORS */}
            <div className="
            flex justify-between p-3 sm:rounded-md border-b-2 sm:mb-3 transition-colors duration-1000
            bg-Light-fondo-input text-light-text-select border-Light-border
            dark:bg-Dark-fondo-input  dark:text-light-text-select dark:border-Dark-border ">
                <span>{todos.length} item left</span>

                <ul className="hidden sm:flex gap-4 cursor-pointer">
                    {selects.map((select, i) => (
                        <li
                            onClick={() => setSelectActive(select)}
                            className={clsx(
                                "hover:text-Text-Active",
                                selectActive === select && "text-Text-Active underline")}
                            key={select[i]}>
                            {select}
                        </li>
                    ))}
                </ul>

                {/* DELETE ALL COMPLETED */}
                <span
                    onClick={deleteAllCompleted}
                    className="cursor-pointer hover:text-Text-Active">
                    Clear completed
                </span>
            </div>

            {/* LISTA TODOS */}
            <Reorder.Group axis="y" values={items} onReorder={setItems}>
                {
                    selectActive === "All"
                        ?

                        items.map(item => (
                            <Reorder.Item key={item.id} value={item}>
                                <ListTodo todo={item} />
                            </Reorder.Item>
                        ))

                        :
                        items.filter(item => (selectActive === "Completed") ? item.completed === true : item.completed === false)
                            .map(item => (
                                <Reorder.Item key={item.id} value={item}>
                                    <ListTodo todo={item} />
                                </Reorder.Item>
                            ))
                }
            </Reorder.Group>

        </div>
    )
}
