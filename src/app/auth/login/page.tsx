"use client"
import dynamic from 'next/dynamic'
import LoginSkeleton from '@src/components/skeletons/Auth'

const LoginForm = dynamic(() => import('@src/components/auth/LoginForm'), {
    ssr: false,
    loading: () => <LoginSkeleton />,
})

export default function LoginPage() {
    return (
        <div className="w-full flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-background-secondary">
                <LoginForm />
            </div>
        </div>
    )
}