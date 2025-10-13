// /auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { User as AuthUser } from "next-auth"
import { login } from "./services/auth/login"
import { getUserProfileServer } from "./services/user/me"


export const {
    handlers: { GET, POST },
    auth,       // úsalo directamente en Server Actions si quieres
    signIn,
    signOut,
} = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24,          // 1 día
        updateAge: 60 * 60 * 24 * 30,  // igual que tu config
    },
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "Contraseña", type: "password" },
            },
            // TODO real: seguir hardcodeado por ahora
            async authorize(credentials): Promise<AuthUser | null> {
                if (
                    !credentials ||
                    typeof credentials.email !== "string" ||
                    typeof credentials.password !== "string"
                ) {
                    return null
                }

                const response = await login({
                    email: credentials.email,
                    password: credentials.password
                })

                const profile = await getUserProfileServer(response.accessToken)
                const user: AuthUser = {
                    id: profile.id,
                    email: profile.email,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    accessToken: response.accessToken,
                }

                return user
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Primer login: copiar del user -> JWT (tipos estrictos)
            if (user) {
                token.id = user.id
                token.accessToken = user.accessToken
                if (user.email) token.email = user.email
                if (user.firstName) token.firstName = user.firstName
                if (user.lastName) token.lastName = user.lastName
            }
            return token
        },
        async session({ session, token }) {
            // Role hardcodeado (sin decodificar nada)
            const role = "admin"

            session.accessToken = token.accessToken
            session.user = {
                id: token.id,
                email: typeof token.email === "string" ? token.email : "",
                firstName: typeof token.firstName === "string" ? token.firstName : "",
                lastName: typeof token.lastName === "string" ? token.lastName : "",
                role,
            }
            return session
        },
    },
})
