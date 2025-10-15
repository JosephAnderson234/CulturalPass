"use client";

import { useSession } from "next-auth/react";
import { UserIcon } from "../lib/icons";
import Link from "next/link";

export const AuthSection = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "authenticated") {
        return (
            <div className="text-white text-xl p-3 pr-5 flex flex-row items-center">
                {session.user?.firstName}  <UserIcon className="inline w-10 ml-2 text-white" />
            </div>
        );
    }

    return (
        <div className="text-white flex h-full items-center justify-center gap-5 mx-2 text-lg">
            <div className="p-2 ">
                <Link href="/auth/login">Iniciar sesión</Link>
            </div>
            <div className="p-2 rounded-xl border border-white">
                <Link href="/auth/register">Crear cuenta</Link>
            </div>
        </div>
    );

}