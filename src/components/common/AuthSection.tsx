"use client";

import { useSession } from "next-auth/react";

export const AuthSection = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "authenticated") {
        return (
            <div className="text-white">
                Signed in as {session.user?.email}
            </div>
        );
    }

    return (
        <div className="text-white">
            Not signed in
        </div>
    );

}