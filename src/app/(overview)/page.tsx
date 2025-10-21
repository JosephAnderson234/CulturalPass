import EventSearchLayer from "@src/components/Event/EventSearchLayer";
import { PublicLayer } from "@src/components/Event/PublicLayer";
import { Suspense } from "react";


export default async function HomePage({ searchParams }: {
    searchParams?: Promise<{
        page?: string;
        event?: string;
        size?: string;
    }>
}) {

    const sp = await searchParams;

    const page = sp?.page ? parseInt(sp.page) : 1;
    const event = sp?.event;
    const size = sp?.size ? parseInt(sp.size) : 10;

    if (!event){
        return <PublicLayer />
    }

    return <Suspense fallback={<div>Loading...</div>}><EventSearchLayer q={event} page={page} size={size} /></Suspense>
}