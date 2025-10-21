"use client";
import { EventResponse } from "@src/interfaces/event/EventResponse";
import { getThemeTypeEvent } from "@src/utils/themeGetter";
import { interFont } from "../lib/fonts";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";


export const EventCard = ({ data }: { data: EventResponse }) => {
    const calculateTimeLeft = useCallback(() => {
        const eventDate = new Date(data.startDate);
        const now = new Date();
        const diff = eventDate.getTime() - now.getTime();
        if (diff <= 0) return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
        let remaining = diff;
        const months = Math.floor(remaining / (1000 * 60 * 60 * 24 * 30));
        remaining -= months * (1000 * 60 * 60 * 24 * 30);
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        remaining -= days * (1000 * 60 * 60 * 24);
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        remaining -= hours * (1000 * 60 * 60);
        const minutes = Math.floor(remaining / (1000 * 60));
        remaining -= minutes * (1000 * 60);
        const seconds = Math.floor(remaining / 1000);
        return { months, days, hours, minutes, seconds };
    }, [data.startDate]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    return (
        <div className="border-2 p-4 rounded-3xl border-background-secondary flex flex-col w-full overflow-y-hidden group relative min-w-60">
            <div className="flex w-11/12 mx-auto">
                <p className={`${getThemeTypeEvent(data.type)} px-2 py-1 rounded-sm mx-2 mt-1 mb-5 text-sm junto con un ajunta de h-10/12`}>{data.type}</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.imageUrl} alt={`image_${data.id}`} className="w-10/12 mx-auto rounded-xl" />
            <h2 className="text-xl font-semibold my-2 text-center ">{data.title}</h2>
            <div className="flex flex-col items-center my-4">
                <p className={`${interFont.className}`}>Comienza en:</p>
                <p>
                    {timeLeft.months}M {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M {timeLeft.seconds}S
                </p>
            </div>
            <div className="bg-background-secondary text-white absolute -bottom-24 left-0 w-full text-center rounded-b-3xl border-background-secondary group-hover:-bottom-1 transition-all duration-300">
                <Link href={`/event/${data.id}`} className="block py-7">Ver evento</Link>
            </div>
        </div>
    );
}