import type { Metadata } from "next";
import "@src/styles/globals.css";
import AuthProvider from '@src/components/context/AuthProvider';
import Header from '@src/components/common/Header';

export const metadata: Metadata = {
    title: "Cultural Pass",
    description: "Plataforma de gestión de eventos culturales",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body
                className="bg-background-tertiary "
            >
                <AuthProvider>
                    <Header />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
