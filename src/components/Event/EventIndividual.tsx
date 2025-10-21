import { getEventById } from "@src/services/event/getById";
import ResultIndividualPage from './ResultInidividualPage';

export default async function EventIndividualSection({ idEvent }: { idEvent: string }) {
    const dataEvent = await getEventById(idEvent);

    return (
        <>
            <ResultIndividualPage data={dataEvent} />
        </>
    );
}
