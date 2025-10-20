import { EventResponse } from "@src/interfaces/event/EventResponse";
import { getThemeTypeEvent } from "@src/utils/themeGetter";
import Image from "next/image";

export const EventCard = ( {data} : {data:EventResponse} ) => {
    return (
        <div className="border-2 p-2.5 rounded border-background-secondary flex flex-col ">
            <div className="flex ">
                <p className={`${getThemeTypeEvent(data.type)} px-2 py-1 rounded`}>{data.type}</p>
            </div>
            <Image src={data.imageUrl} alt={`image_${data.id}`} width={100} height={100} />
            <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
            <p className="text-gray-600 mb-4">{data.description}</p>
            <p className="text-sm text-gray-500">Date: {new Date(data.startDate).toLocaleDateString()}</p>
        </div>

    )
}