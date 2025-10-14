"use client";
import { LoginRequest } from "@src/interfaces/auth/LoginRequest";
import { useForm, SubmitHandler } from "react-hook-form"
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import Logo from "@src/assets/logo.png"
import Image from 'next/image';

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>()

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const error = searchParams.get("error");

    const onSubmit: SubmitHandler<LoginRequest> = (credentials) => {
        signIn("credentials", {
            ...credentials,
            redirect: true,
            callbackUrl
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center p-2">

            <div className="w-full">
                <Image className="w-8/12 mx-auto" src={Logo} alt="Logo" priority />
            </div>

            <div className="flex flex-col w-full">
                <label htmlFor="email" className="text-white pl-3 py-1">Correo: </label>
                <input className="rounded-2xl bg-background-tertiary px-3 py-2" type="email" placeholder="Email" {...register("email", { required: true })} />
            </div>
            <div className="flex flex-col w-full">
                <label htmlFor="password" className="text-white pl-3 py-1">Contraseña: </label>
                <input className="rounded-2xl bg-background-tertiary px-3 py-2" type="password" placeholder="Password" {...register("password", { required: true })} />
            </div>

            <div>
                {errors.email && <span>El correo es obligatorio</span>}
                {errors.password && <span>La contraseña es obligatoria</span>}
                {error && <span className="text-red-500">Credenciales inválidas</span>}
            </div>

            <div className="text-white">
                No tienes cuenta? <Link href={`/auth/register${callbackUrl ? `?callbackUrl=${callbackUrl}` : ''}`}>Regístrate</Link>
            </div>

            <button type="submit" className="mx-auto w-10/12 bg-background p-2 rounded-2xl">Iniciar Sesión</button>
        </form>
    )

}