"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const SearchSide = ({ placeholder }: { placeholder: string }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = useDebouncedCallback((term: string) => {

        const params = new URLSearchParams(searchParams);

        params.set('page', '1');

        if (term) {
            params.set('product', term);
        } else {
            params.delete('product');
        }
        router.push(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative flex items-center justify-center p-3">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className=" block w-11/12 md:w-9/12 rounded-md border border-background py-[9px] pl-10 text-sm outline-2 placeholder:text-foreground bg-background-little text-white p-1 text-center"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('product')?.toString()}
            />

        </div>
    );

}


export default SearchSide