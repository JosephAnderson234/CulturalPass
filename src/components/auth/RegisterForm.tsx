"use client";
import { RegisterRequest } from "@src/interfaces/auth/RegisterRequest";
import { useForm, SubmitHandler } from "react-hook-form"
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import Logo from "@src/assets/logo.png"
import Image from 'next/image';
import { register as registerService } from '@src/services/auth/register';

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterRequest>()

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const error = searchParams.get("error");

    const onSubmit: SubmitHandler<RegisterRequest> = async (dataForRegister) => {

        await registerService(dataForRegister)

        signIn("credentials", {
            ...{
                email: dataForRegister.email,
                password: dataForRegister.password
            },
            redirect: true,
            callbackUrl
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row items-center p-2">

            <div className="min-w-5/12">
                <Image className="w-8/12 mx-auto" src={Logo} alt="Logo" priority />
            </div>

            <div className="min-w-7/12 flex flex-col justify-center">
                <div className="flex gap-4">
                    <div className="flex flex-col w-full">
                        <label htmlFor="email" className="text-white pl-3 py-1">Correo: </label>
                        <input className="rounded-2xl bg-background-tertiary px-3 py-2" type="email" placeholder="Email" {...register("email", { required: true })} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="password" className="text-white pl-3 py-1">Contraseña: </label>
                        <input className="rounded-2xl bg-background-tertiary px-3 py-2" type="password" placeholder="Password" {...register("password", { required: true })} />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col w-full">
                        <label htmlFor="firstName" className="text-white pl-3 py-1">Nombres: </label>
                        <input className="rounded-2xl bg-background-tertiary px-3 py-2" type="text" placeholder="Nombres" {...register("firstName", { required: true })} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="lastName" className="text-white pl-3 py-1">Apellidos: </label>
                        <input className="rounded-2xl bg-background-tertiary px-3 py-2" type="text" placeholder="Apellidos" {...register("lastName", { required: true })} />
                    </div>
                </div>

                <div className="flex gap-4 w-1/2 mx-auto">
                    <div className="flex flex-col w-full items-center">
                        <label htmlFor="phone" className="text-white py-1">Numero de celular: </label>
                        <input className="rounded-2xl bg-background-tertiary px-3 py-2" type="text" placeholder="Numero de celular" {...register("cellphone", { required: true })} />
                    </div>
                </div>
                <div>
                    {errors.email && <span>El correo es obligatorio</span>}
                    {errors.password && <span>La contraseña es obligatoria</span>}
                    {error && <span className="text-red-500">Credenciales inválidas</span>}
                </div>

                <div className="text-white text-center my-2">
                    Ya tienes cuenta? <Link href={`/auth/login${callbackUrl ? `?callbackUrl=${callbackUrl}` : ''}`}>Inicia Sesión</Link>
                </div>

                <button type="submit" className="mx-auto w-10/12 bg-background p-2 rounded-2xl">Registrarse</button>
            </div>


        </form>
    )

}