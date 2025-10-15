"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@src/assets/logo.png"
import { AuthSection } from './AuthSection';
import dynamic from "next/dynamic";


const SearchSide = dynamic(() => import('@src/components/common/SearchSide'), { ssr: false });

export const Header = () => {

    const pathname = usePathname();
    const showSearch = pathname === "/";
    const authPath = pathname.startsWith("/auth");
    if (authPath) {
        return null;
    }

    return (
        <header className=" py-2 px-4 m-4 bg-background-secondary rounded-3xl flex justify-between items-center">
            <div className="flex justify-center">
                <Image className="w-24" src={Logo} alt="Logo" priority />
            </div>

            {showSearch && <SearchSide placeholder="Buscar un evento..." />}

            <AuthSection />

        </header>
    )


}

export default Header;