import EventIndividualSection from "@src/components/Event/EventIndividual";


export default async function EventIndividualPage({ params }: { params: Promise<{ idEvent: string}> }) {
    const { idEvent } = await params;


    

    return (
        <div className=" bg-background rounded-2xl w-11/12 mx-auto">
            <EventIndividualSection idEvent={idEvent} />
        </div>
    );
}