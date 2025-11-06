"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const AuthSection = () => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "authenticated") {
        return (
            <div className="flex items-center flex-row">
                <div className="text-white text-xl p-3 pr-5 flex flex-row items-center rounded-3xl bg-background">
                    <div className="bg-background-little-1 rounded-full h-10 w-10 flex items-center justify-center mr-3 text-white font-bold">
                        {session.user.firstName[0].toUpperCase()}
                    </div>
                    <Link href={`/profile`} className="flex flex-col">
                        <p className="text-background-little-1 text-sm">Bienvenido:</p>
                        <p className="text-background-little-1 text-sm font-bold">{session.user?.firstName}</p>
                    </Link>
                </div>
                <button onClick={() => signOut()} className="min-w-fit  mx-4 px-4 py-2 bg-transparent text-background-secondary rounded-3xl border-background-secondary border-2  transition-colors cursor-pointer hover:bg-background-secondary hover:text-white">
                    Cerrar Sesión
                </button>
            </div>

        );
    }

    const redirectTo = pathname !== "/" ? `${encodeURIComponent(pathname)}` : "";

    return (
        <div className="text-white flex h-full items-center justify-center gap-5 mx-2 text-lg">
            <div className="p-2 ">
                <Link href={`/auth/login?callbackUrl=${redirectTo}`}>Iniciar sesión</Link>
            </div>
            <div className="p-2 rounded-xl border border-white">
                <Link href="/auth/register">Crear cuenta</Link>
            </div>
        </div>
    );

}