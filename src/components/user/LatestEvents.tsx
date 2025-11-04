import { EventResponse } from "@src/interfaces/event/EventResponse";
import { getLatestEvents } from "@src/services/user/getLatestEvents";
import { TypeMiniCard, TimeLeftCounter } from '../common/Cards';
import { RightArrowIcon } from "../lib/icons";


const MiniItem = ({event}:{event: EventResponse}) => {
    return (
        <div className="border border-background-secondary p-2 flex flex-row justify-between">
            <div>
                <TypeMiniCard type={event.type}/>
            </div>
            <div>
                <h2>{event.title}</h2>
                <div>
                    <TimeLeftCounter startDate={event.startDate}/>
                </div>
            </div>
            <div>
                <RightArrowIcon />
            </div>
        </div>
    )
}

export default async function LatestEvents() {
    const events = await getLatestEvents();
    return (
        <div>

            <div>
                {events.length === 0 ? (
                    <p className="text-center my-5">No hay eventos recientes.</p>
                ) : (
                    events.map((event) => (
                        <div key={event.id} className="my-3">
                            <MiniItem event={event} />
                        </div>
                    ))
                )}
            </div>


            <div>

            </div>
        </div>
    )
}