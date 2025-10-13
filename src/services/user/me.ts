"use client";

import { UserResponse } from "@src/interfaces/user/user";
import {getServerAuthToken} from "@src/utils/getServerAuthToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const getUserProfile = async () => {
    const token = await getServerAuthToken();

    const res = await fetch(`${API_URL}/api/user/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch user profile");
    }

    return res.json() as Promise<UserResponse>;
};

export const getUserProfileServer = async (token: string) => {
    const res = await fetch(`${API_URL}/api/user/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch user profile");
    }

    return res.json() as Promise<UserResponse>;
};
