import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const session = await auth()

    if (session?.user) {
        redirect("/todos")
    }
    return (
        <main className="text-white">
            {children}
        </main>
    );
}