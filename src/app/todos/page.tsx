import { DarkButton, FormTodo, SingHome, CardTodo } from "@/components";
import { redirect } from "next/navigation";
import { todosById } from "@/actions";
import { Suspense } from "react";
import Link from "next/link";


export const metadata = {
    title: 'Todo | Tasks',
    description: 'esta es una pagina donde podrás tener tus tareas de manera ordenada',
};

export default async function TodoPage() {

    const session = await todosById()
    if (!session) redirect("/auth/login")

    const { user, todos } = session
    return (
        <article className="
        min-h-screen flex justify-center transition-colors duration-1000 pb-16
         bg-Light-fondo  text-white  
        dark:bg-Dark-fondo">

            {/* IMAGEN */}
            <div className="
            h-[400px] absolute top-0 left-0 right-0 bg-no-repeat bg-cover z-20 transition-all duration-1000
            bg-mobile-light dark:bg-mobile-dark
            md:bg-desktop-light dark:md:bg-desktop-dark " />

            {/* CONTAINER */}

            <div className="max-w-[520px] w-full relative px-4 z-50 mt-6">

                {/* LOGOUT */}
                <div className="flex justify-between items-center">
                    <SingHome />
                    <span className="sm:text-2xl uppercase">{session ? user.user.name : "sin-usuario"}</span>
                </div>

                {/* DARK */}
                <div className="flex items-center justify-between">
                    <Link href="/"><h2 className="text-4xl font-bold my-6 hover:text-blue-400">TODO</h2></Link>
                    <DarkButton />
                </div>

                {/* FORMULARIO */}
                <FormTodo />

                {/* BLOQUE DE LISTA */}

                <CardTodo todos={todos} />

                {todos.length > 0 ?
                    (<p className="text-center text-xl mt-8 text-Dark-text-completed">Drag and drop to reorder list</p>)
                    :
                    (<p className="text-center text-xl mt-8 text-Dark-text-completed">there are no tasks</p>)}

            </div>
        </article>
    );
}

