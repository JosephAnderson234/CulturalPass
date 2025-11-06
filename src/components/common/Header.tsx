"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@src/assets/logo.png"
import { AuthSection } from './AuthSection';
import dynamic from "next/dynamic";
import Link from "next/link";


const SearchSide = dynamic(() => import('@src/components/common/SearchSide'), { ssr: false });

export const Header = () => {

    const pathname = usePathname();
    const showSearch = pathname === "/";
    const authPath = pathname.startsWith("/auth");
    if (authPath) {
        return null;
    }

    return (
        <header className=" py-2 px-4 bg-background-tertiary sticky top-0 w-full z-50 shadow-md">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex justify-center min-w-fit mx-4 my-3">
                    <Link href="/" className="flex flex-row items-center text-background-secondary font-bold">
                        <Image className="w-24" src={Logo} alt="Logo" priority />
                        <div className="font-sans">
                            Centro Cultural
                            <br />
                            Amador Ballumbrioso
                        </div>
                    </Link>

                </div>

                {showSearch && <SearchSide placeholder="Buscar un evento..." />}

                <AuthSection />
            </div>


        </header>
    )


}

export default Header;