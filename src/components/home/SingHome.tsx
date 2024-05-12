import { auth } from "@/auth";
import { LogoutButton } from "@/components";
import Link from "next/link";
import { BiLogIn } from "react-icons/bi";

export async function SingHome() {

    const session = await auth()

    return (
        <>
            {
                session ?
                    (
                        <LogoutButton />
                    )
                    :
                    (
                        <Link href={"/auth/login"}
                            className="bg-dark-Fondo-gradient py-1 px-4 rounded-xl flex max-w-max gap-2 cursor-pointer">
                            <BiLogIn size={30} />
                            <button className="font-bold" >Login</button>
                        </Link>
                    )
            }

        </>
    )
}