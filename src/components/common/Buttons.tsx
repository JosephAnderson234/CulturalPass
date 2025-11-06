"use client";
import { ButtonHTMLAttributes } from "react";
import { useNotification } from "../context/NotificationContext";
import { withRoleActionButton } from "./hoc";
import { useRouter } from "next/navigation";

export const BasicButtonCart = ({ className, children , ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            className={`px-3 py-2 rounded-md transition-all duration-300 bg-background-secondary text-white font-semibold border border-foreground/20 hover:bg-background-secondary/80 focus:outline-none focus:ring-2 focus:ring-foreground/50 ${className ?? ""}`.trim()}
        >
            {children}
        </button>
    );
};

export const EnrollButton = ({ idEvent, children, ...props }: { idEvent: string, children: React.ReactNode }) => {
    const { showNotification } = useNotification();
    const router = useRouter();

    return withRoleActionButton(BasicButtonCart, {
        actions: {
            ADMIN: () => {},
            CLIENTE: (idEvent) => {
                router.push("/payment/" + idEvent);
            },
            guest: () => {
                showNotification({ message: "Por favor inicia sesión para continuar", type: "info"});
            },
        },
    })({ idEvent, children, ...props });
};


export const BackButton = () => {
    const router = useRouter();
    return (
        <button
            onClick={() => router.back()}
            className=" my-3 text-background-little-1 text-base cursor-pointer hover:underline"
        >
            ← Volver
        </button>
    );
}