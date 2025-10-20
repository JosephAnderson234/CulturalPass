"use client";

import { PaginatedResponse } from "@src/interfaces/common/PaginatedResponse";
import { EventResponse } from "@src/interfaces/event/EventResponse";

import { EventCard } from "../common/Cards";

export default function ResultEvent({ event }: { event: PaginatedResponse<EventResponse> }) {
    

    return (
        <div className="w-full p-4">
            <h1 className="text-2xl font-bold mb-4">Search Results</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {event.content.length === 0 ? (
                <p>No events found.</p>
            ) : (
                event.content.map((item) => (
                    <EventCard key={item.id} data={item} />
                ))
            )}
            </div>
            
        </div>
    )
}