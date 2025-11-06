"use client";
import { EventResponse } from "@src/interfaces/event/EventResponse";
import { TypeMiniCard, TagsList } from '../common/Cards';
import { LocationIcon } from '../lib/icons';
import { EnrollButton } from '../common/Buttons';
import { ServerActionResponse } from "@src/interfaces/common/ServerActionResponse";
import Link from "next/link";


export default function ResultIndividualPage({ data, dataEnrollment }: { data: EventResponse, dataEnrollment: ServerActionResponse<boolean> }) {
    return (
        <div className="w-full p-8 mx-auto bg-bg-alternative rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row">

            <div className="md:w-8/12 w-full  p-8 flex flex-col">
                <div className="flex flex-row gap-5 items-center justify-start">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 text-background-secondary">{data.title}</h1>
                    <div className="mb-3 flex flex-row">
                        <TypeMiniCard type={data.type} />
                    </div>
                </div>



                <p className="text-base md:text-lg text-background-secondary my-4 leading-7">{data.description}</p>

                <div className="mb-4">
                    <TagsList tags={data.tags} />
                </div>

                <div className="bg-background rounded-4xl p-5">
                    <div className="text-center">
                        <h1 className="text-xl text-background-secondary font-bold my-4">Detalles del evento</h1>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <LocationIcon className="text-background-secondary w-6 h-6" />
                        <span className="text-lg text-background-secondary">{data.location}</span>
                    </div>
                    <div className="mb-6">
                        {/*The format here should be like Sabado 25 de Febrero 2023 */}
                        <p className="capitalize text-lg text-background-secondary">📅 {new Date(data.startDate).toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                    </div>
                    <div className="">
                        {/*The format here should be like 3pm, format am and pm, not 24hrs format*/}
                        <p className="text-lg text-background-secondary">⏰ {new Date(data.startDate).toLocaleTimeString("es-ES", { hour: "numeric", minute: "numeric", hour12: true })}</p>
                    </div>
                </div>


            </div>

            <div className="md:w-4/12 w-full  p-6 flex flex-col items-center justify-center">
                {/*eslint-disable-next-line @next/next/no-img-element  */}
                <img
                    src={data.imageUrl}
                    alt={data.title}
                    className="rounded-2xl w-full h-auto object-cover shadow-inner"
                />
                {/*Section for enroll button */}
                <div className="w-full flex flex-col items-center justify-center my-10">
                    {!dataEnrollment.data ?
                        <EnrollButton idEvent={data.id.toString()}>
                            Inscribirse {data.costEntry > 0 ? `- S/${data.costEntry}` : "(Gratis)"}
                        </EnrollButton>
                        : <Link href={`/events/${data.id}/dashboard`} className="w-full rounded-3xl px-4 py-3 text-center bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-300">
                            Ir al panel del evento
                        </Link>}
                </div>
            </div>

        </div>
    );
}