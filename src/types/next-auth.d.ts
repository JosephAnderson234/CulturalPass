import "next-auth"

declare module "next-auth" {
    interface Session {
        accessToken?: string
        user: {
            id: string
            email: string
            name: string
            role: string
        }
    }

    interface User {
        id: string
        email: string
        accessToken: string
        name: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        accessToken: string
    }
}