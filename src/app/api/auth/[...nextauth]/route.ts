
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { LoginRequest } from '@src/interfaces/auth/LoginRequest';
import { jwtDecode } from "jwt-decode";
import { login } from "@src/services/auth/login";
import { getUserProfile } from "@src/services/user/me";
import { UserRoles } from "@src/interfaces/auth/tokenClaims";



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
            let rol: UserRoles = "guest";
            try {
                if (token?.accessToken && typeof token.accessToken === 'string') {
                    const parts = token.accessToken.split('.')
                    if (parts.length === 3) {
                        // jwtDecode puede lanzar si el token está mal formado, así que lo envolvemos
                        const decoded = jwtDecode(token.accessToken) as Record<string, unknown>
                        // admitir tanto `rol` como `role` en el payload
                        rol = (decoded.rol as UserRoles) || (decoded.role as UserRoles)
                    }
                }

                // Asignamos los campos de usuario de forma segura
                session.user = {
                    id: (token.id as string) || "",
                    email: (token.email as string) || "",
                    firstName: (token.firstName as string) || "",
                    lastName: (token.lastName as string) || "",
                    role: rol,
                };

                session.accessToken = (token.accessToken as string) || ""
            } catch (err) {
                // No queremos que una excepción aquí rompa la respuesta del endpoint
                console.error('Error en session callback next-auth:', err)
                // mantener session por defecto si ocurre un error
            }

            return session
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