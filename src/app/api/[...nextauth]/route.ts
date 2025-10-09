
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
//import { login, getUserProfile, authGoogle,  } from "@/services/auth"
import { LoginRequest } from '@src/interfaces/auth/LoginRequest';
import { jwtDecode } from "jwt-decode"



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


                    const response = {token: "xdkjnfjeb"} // await login(credentials)
                    const token = response.token
                    const user = {
                        id: "1", //decoded.id,
                        correo: "correo@ejemplo.com",
                        nombre: "Nombre Ejemplo", //decoded.nombre,
                    } //await getUserProfile(token);
                    if (!user) return null;
                    return {
                        id: user.id,
                        email: user.correo,
                        name: user.nombre,
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
            if (user) {
                token.id = user.id || token.id;
                token.email = user.email || user.email || token.email;
                token.name = user.name || user.name || token.name;
                token.accessToken = user.accessToken || token.accessToken;
            }
            return token;
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
                name: token.name as string,
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