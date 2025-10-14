import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'
import { TokenClaims } from './interfaces/auth/tokenClaims'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const pathname = request.nextUrl.pathname


    const adminPaths = ['/dashboard', '/dashboard/create', '/profile']
    const userPaths = ['/profile', '/myevents', '/tickets']
    const publicPaths = ['/', '/events', '/event', '/about', '/contact']

    const isAuth = !!token
    const isAuthPage = pathname.startsWith('/auth')

    const isAdminPage = adminPaths.some((path) => pathname.startsWith(path))
    const isUserPage = userPaths.some((path) => pathname.startsWith(path))
    const isPublicPage = publicPaths.some((path) => pathname.startsWith(path))

    if (isAuth) {
        const role = jwtDecode<TokenClaims>(token?.accessToken || '')?.role || 'CLIENTE'
        if (isAuthPage) {
            const redirectPath = role === 'ADMIN' ? '/dashboard' : '/'
            return NextResponse.redirect(new URL(redirectPath, request.url))
        }


        if (role === 'ADMIN' && isUserPage && !isPublicPage) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }


        if (role !== 'ADMIN' && isAdminPage && !isUserPage) {
            return NextResponse.redirect(new URL('/', request.url))
        }

        return NextResponse.next()
    }


    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname + request.nextUrl.search)


    if (isAdminPage || isUserPage) {
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile/:path*',
        '/myevents/:path*',
        '/tickets/:path*',
        '/auth/:path*',
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
