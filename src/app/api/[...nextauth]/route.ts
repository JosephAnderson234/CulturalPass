
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { LoginRequest } from '@src/interfaces/auth/LoginRequest';
import { jwtDecode } from "jwt-decode"
import { login } from "@src/services/auth/login";
import { getUserProfile } from "@src/services/user/me";



const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "Contraseña", type: "password" },
            },
            async authorize(credentials: LoginRequest | undefined) {
                try {
                    if (!credentials) return null;


                    const response = await login({
                        email: credentials.email,
                        password: credentials.password
                    })
                    const token = response.token;
                    const user = await getUserProfile(token);
                    if (!user) return null;
                    return {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        accessToken: token,
                    };
                } catch (error) {
                    console.error('Error en autenticación:', error);
                    return null;
                }
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
            let rol: string = "";
            if (token.accessToken && typeof token.accessToken === 'string' && token.accessToken.split('.').length === 3) {
                const decoded = jwtDecode(token.accessToken) as { rol?: string };
                rol = decoded.rol || "";
            }
            session.user = {
                id: token.id as string,
                email: token.email as string,
                firstName: token.firstName as string,
                lastName: token.lastName as string,
                role: rol,
            };
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
    },
    session: {
        strategy: "jwt",
        maxAge: 60*60*24, 
        updateAge: 60 * 60 * 24 * 30,
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }