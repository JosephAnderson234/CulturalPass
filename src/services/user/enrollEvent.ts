"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";


export const enrollEvent = async (eventId: string, token: string) => {
    const res = await fetch(`${API_URL}/api/user/me/${eventId}/enroll`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to enroll in event");
    }

    return res.json() as Promise<void>;
};