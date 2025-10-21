import EventIndividualSection from "@src/components/Event/EventIndividual";


export default async function EventIndividualPage({ params }: { params: Promise<{ idEvent: string}> }) {
    const { idEvent } = await params;


    

    return (
        <div className=" w-full mx-auto">
            <EventIndividualSection idEvent={idEvent} />
        </div>
    );
}