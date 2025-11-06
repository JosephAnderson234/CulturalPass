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
            <div className="flex items-center gap-3">
                <div className="flex items-center rounded-3xl bg-background px-3 py-2 gap-3">
                    <div className="bg-background-little-1 rounded-full h-9 w-9 flex items-center justify-center text-white font-bold text-sm">
                        {session.user.firstName[0].toUpperCase()}
                    </div>
                    <Link href={`/profile`} className="flex flex-col truncate">
                        <p className="text-background-little-1 text-xs">Bienvenido:</p>
                        <p className="text-background-little-1 text-sm font-bold truncate">{session.user?.firstName}</p>
                    </Link>
                </div>

                <button onClick={() => signOut()} className="min-w-fit mx-1 px-3 py-2 bg-transparent text-background-secondary rounded-3xl border-background-secondary border-2 transition-colors cursor-pointer hover:bg-background-secondary hover:text-white text-sm">
                    Cerrar Sesión
                </button>
            </div>

        );
    }

    const redirectTo = pathname !== "/" ? `${encodeURIComponent(pathname)}` : "";

    return (
        <div className="flex items-center gap-2 text-background-secondary">
            <div className="p-1 text-sm">
                <Link href={`/auth/login?callbackUrl=${redirectTo}`} className="block px-3 py-1 rounded-md hover:bg-bg-alternative">Iniciar sesión</Link>
            </div>
            <div className="p-1">
                <Link href="/auth/register" className="block px-3 py-1 rounded-md border border-background-secondary hover:bg-white/10">Crear cuenta</Link>
            </div>
        </div>
    );

}