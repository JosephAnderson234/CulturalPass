"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { SearchIcon } from '../lib/icons';

const SearchSide = ({ placeholder }: { placeholder: string }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = useDebouncedCallback((term: string) => {

        const params = new URLSearchParams(searchParams);

        params.set('page', '1');

        if (term) {
            params.set('event', term);
        } else {
            params.delete('event');
        }
        router.push(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative flex items-center justify-center p-3 w-full">
            <input
                className="block w-full  rounded-3xl shadow-2xl xl pl-5 placeholder:text-[#bdbdbc] placeholder:font-semibold bg-bg-alternative text-black p-3 text-left"
                name='search'
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('event')?.toString()}
            />

            <SearchIcon className="absolute right-6 h-9 text-background-secondary" />

        </div>
    );

}


export default SearchSide