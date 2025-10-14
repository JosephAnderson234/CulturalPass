import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'
import { TokenClaims } from './interfaces/auth/tokenClaims'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const isAuth = !!token
    const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
    const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard')

    const isProfilePage = request.nextUrl.pathname.startsWith('/profile')

    if (isAuth) {
        const role = jwtDecode<TokenClaims>(token?.accessToken || '')?.role || 'USER'
        // Si está autenticado y trata de acceder a la página de auth, redirige a dashboard
        if (isAuthPage) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        // Si está autenticado y no está en dashboard, redirige a dashboard
        if (!isDashboardPage && role === 'ADMIN') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        } 
    } else {
        // Si no está autenticado y trata de acceder a dashboard, redirige a login
        if (isDashboardPage) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
        if (isProfilePage) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/auth/:path*',
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}