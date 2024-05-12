"use client"

import clsx from "clsx";
import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

export function DarkButton() {

    const [darkMode, setDarkMode] = useState(false)

    const handleDark = () => {
        if (darkMode) {
            document.querySelector("html")?.classList.add("dark")
        } else {
            document.querySelector("html")?.classList.remove("dark")
        }
        setDarkMode(!darkMode)
    }

    return (
        <div onClick={handleDark} className="flex items-center bg-Dark-fondo-input py-2 px-3 rounded-full relative gap-4 cursor-pointer">
            <FaMoon size={25} />
            <div className={clsx(
                "h-7 w-7 bg-blue-500 rounded-full absolute transition-all duration-1000",
                darkMode && "translate-x-10")} />
            <IoSunny size={27} />
        </div>
    )
}
