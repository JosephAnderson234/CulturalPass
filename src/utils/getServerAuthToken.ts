// lib/get-server-auth-token.ts
'use server'

import 'server-only'
import { auth } from '@src/auth'

export async function getServerAuthToken(): Promise<string> {
    const session = await auth()
    const token = session?.accessToken
    if (!token) {
        throw new Error('No hay token de autenticación disponible')
    }
    return token
}
