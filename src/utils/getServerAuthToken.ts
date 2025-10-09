import { cookies } from 'next/headers'
import { getToken } from 'next-auth/jwt'
import type { JWT } from 'next-auth/jwt'

/**
 * Obtiene el access token del usuario loggeado en un Server Action / Server Component.
 * Devuelve el accessToken (string) o null si no hay sesión.
 *
 * Uso: en una server action o componente server:
 * const token = await getServerAuthToken()
 */
export type GetServerAuthTokenOptions = {
    /**
     * Si true, llama a getToken con `raw: true` y devuelve el JWT como string cuando esté presente.
     * Por defecto false (devuelve objeto JWT cuando sea posible).
     */
    raw?: boolean
    /**
     * Si true, lanza un error cuando no se encuentre token. Por defecto false (devuelve null).
     */
    throwOnMissing?: boolean
    /**
     * Permite sobreescribir el secret usado por next-auth (opcional).
     */
    secret?: string
}

/**
 * Obtiene el access token (o el JWT completo) del usuario loggeado en un Server Action / Server Component.
 *
 * - Devuelve `null` si no hay sesión o si ocurre un error (a menos que `throwOnMissing: true`).
 * - Si `raw: true` puede devolver un string con el token crudo.
 * - Si `raw: false` (por defecto) devuelve el objeto `JWT` (tipado según `src/types/next-auth.d.ts`) o `null`.
 *
 * Uso:
 * const token = await getServerAuthToken()
 * const raw = await getServerAuthToken({ raw: true })
 */
export async function getServerAuthToken(
    opts: GetServerAuthTokenOptions = {}
): Promise<string | JWT | null> {
    const nextCookies = cookies()

    try {
        const tokenOpts: Record<string, unknown> = {
            cookies: nextCookies,
            secureCookie: process.env.NODE_ENV === 'production',
        }

        if (typeof opts.raw !== 'undefined') tokenOpts.raw = opts.raw
        if (typeof opts.secret !== 'undefined') tokenOpts.secret = opts.secret

        // getToken's typing expects a `req` in some overloads; we pass cookies() from Next.js runtime.
        // Aquí hacemos un cast controlado porque el llamado es válido en runtime.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const token = await getToken(tokenOpts as any)

        if (!token) {
            if (opts.throwOnMissing) throw new Error('No auth token found')
            return null
        }

        // Si piden raw, getToken puede devolver un string
        if (typeof token === 'string') return token

        // token tipado como JWT cuando no es raw
        return token as JWT
    } catch {
        if (opts.throwOnMissing) throw new Error('Failed to retrieve auth token')
        return null
    }
}

export default getServerAuthToken
