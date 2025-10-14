"use client";

import RegisterForm from "@src/components/auth/RegisterForm";



export default function RegisterPage() {
    return (
        <div className='w-full flex flex-col items-center justify-center min-h-screen'>
            <div className='w-full max-w-4xl p-8 space-y-3 rounded-xl bg-background-secondary'>
                <RegisterForm />
            </div>
        </div>
    )
}