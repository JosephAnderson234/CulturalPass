"use client";
import SearchSide from "./SearchSide";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@src/assets/logo.png"
import { AuthSection } from './AuthSection';

export const Header = () => {

    const pathname = usePathname();
    const showSearch = pathname === "/";

    return (
        <header className=" p-4 m-4 bg-background-secondary rounded-3xl flex justify-between ">
            <div className="flex justify-center mb-2">
                <Image className="h-20 w-auto" src={Logo} alt="Logo" priority />
            </div>

            {showSearch && <SearchSide placeholder="Search for products..." />}

            <AuthSection />

        </header>
    )


}

export default Header;