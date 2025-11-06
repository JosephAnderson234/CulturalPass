import { EventResponse } from "@src/interfaces/event/EventResponse";
import { getLatestEvents } from "@src/services/user/getLatestEvents";
import { TypeMiniCard, TimeLeftCounterNoSSR } from '@src/components/common/Cards';
import { RightArrowIcon } from "@src/components/lib/icons";
import Link from "next/link";


const MiniItem = ({ event }: { event: EventResponse }) => {
    return (
        <div className="border-2 border-background-secondary p-2 flex flex-row justify-between rounded-2xl">
            <div className="flex flex-col items-center justify-center min-w-24">
                <TypeMiniCard type={event.type} />
            </div>
            <div className="flex-col items-center">
                <p className="text-lg text-center">{event.title}</p>

                <TimeLeftCounterNoSSR startDate={event.startDate} className="flex my-1 text-sm justify-center" />

            </div>
            <div className="flex items-center justify-center">
                <Link href={`/myevents/${event.id}`}>
                    <RightArrowIcon className="w-10 mx-2 text-background-secondary"/>
                </Link>
            </div>
        </div>
    )
}

export default async function LatestEvents() {
    const events = await getLatestEvents();
    return (
        <div className="w-10/12 mx-auto p-5 bg-background-tertiary shadow-md rounded-2xl m-5">

            <h2 className="text-xl font-bold mb-4 text-center">Eventos Recientes</h2>

            <div className=" rounded-2xl p-5 ">
                {events.length === 0 ? (
                    <p className="text-center my-5">No hay eventos recientes.</p>
                ) : (
                    events.map((event) => (
                        <MiniItem event={event} key={event.id} />
                    ))
                )}
            </div>


            <div className="text-center my-4">
                <Link href="/myevents" className="bg-background-secondary px-2 py-3 text-white rounded-xl">
                    Ver todos los eventos
                </Link>
            </div>
        </div>
    )
}