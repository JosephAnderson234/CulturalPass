import { getEventById } from "@src/services/event/getById";
import ResultIndividualPage from './ResultInidividualPage';

export default async function EventIndividualSection({ idEvent }: { idEvent: string }) {
    const dataEvent = await getEventById(idEvent);
    console.log("dataEvent", dataEvent);
    return (
        <>
            <ResultIndividualPage data={dataEvent} />
        </>
    );
}
