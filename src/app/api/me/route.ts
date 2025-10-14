import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req: Request) {
    try {
        const token = await getToken({
            // @ts-expect-error next-auth types para App Router
            req,
        });

    } catch (e) {
        console.error('API /products/export error:', e);
        return NextResponse.json({ message: 'Error interno exportando' }, { status: 500 });
    }
}