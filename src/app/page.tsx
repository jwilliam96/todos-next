import { SingHome } from "@/components";
import Link from "next/link";

export const metadata = {
  title: 'Home',
  description: 'descripción del proyecto de todo',
};

export default async function Home() {

  return (
    <main className="min-h-screen bg-Dark-fondo text-white">

      {/* LOGIN */}
      <div className="max-w-[1600px] m-auto">
        <header className="flex items-center justify-between px-10 pt-8">
          <Link href="/todos"><h1 className="text-4xl font-bold text-gradient">TODO</h1></Link>
          <SingHome />
        </header>

        {/* MENSAJE */}
        <div className="w-11/12 rounded-3xl m-auto text-center bg-Dark-fondo-input py-10 px-12 mt-6 mb-10 lg:w-8/12 lg:rounded-[80px] ">
          <h2 className={`text-4xl mb-6 font-bold text-gradient`}>PROJECT FULL STACK</h2>
          <p>This tasks app is made with a database, so you can keep your tasks started with your username from any device.
            <br /><br />
            With this application you can create, delete, update and complete your tasks. In addition to having the drag and drop option to order your tasks as you like, you can also filter your tasks by completed tasks and those that have not been completed.
          </p>

        </div>

        {/* VIDEO */}
        <div className="w-11/12 m-auto">
          <video autoPlay loop>
            <source src="/video-home.mp4" type="video/mp4" />
            <source src="/video-home.webm" type="video/webm" />
            <source src="/video-home.ogg" type="video/ogg" />
            <p>Lo siento, tu navegador no soporta este formato de video</p>
          </video>
        </div>
      </div>
    </main>
  );
}
