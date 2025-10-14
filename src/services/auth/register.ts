"use server";

import { AuthResponse } from "@src/interfaces/auth/AuthResponse";
import { RegisterRequest } from "@src/interfaces/auth/RegisterRequest";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";


export const register = async (credentials: RegisterRequest ) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error("Registration failed");
    }
    console.log("Registro exitoso:", response);

    return response.json() as Promise<AuthResponse>;
}