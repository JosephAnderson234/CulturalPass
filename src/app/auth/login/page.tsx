"use client";
import LoginForm from '@src/components/auth/LoginForm';




export default function LoginPage() {
    return (
        <div className='w-full flex flex-col items-center justify-center min-h-screen'>
            
            <div className='w-full max-w-md p-8 space-y-3 rounded-xl bg-background-secondary'>
                <LoginForm />
            </div>
        </div>
    )
}