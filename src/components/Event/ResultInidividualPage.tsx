"use client";
import { EventResponse } from "@src/interfaces/event/EventResponse";
import { TypeMiniCard, TagsList } from '../common/Cards';
import { LocationIcon } from '../lib/icons';
import { EnrollButton } from '../common/Buttons';


export default function ResultIndividualPage({ data }: { data: EventResponse }) {
    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto bg-[var(--background-tertiary)] rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-5/12 w-full bg-gradient-to-b from-background to-background-tertiary p-6 flex items-center justify-center">
                    {/*eslint-disable-next-line @next/next/no-img-element  */}
                    <img
                        src={data.imageUrl}
                        alt={data.title}
                        className="rounded-2xl w-full h-auto object-cover shadow-inner"
                    />
                </div>
                <div className="md:w-7/12 w-full bg-gradient-to-b from-background to-background-tertiary p-8 flex flex-col">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-[var(--foreground)]">{data.title}</h1>

                    <div className="mb-3 flex flex-row">
                        <TypeMiniCard type={data.type} />
                    </div>

                    <p className="text-base md:text-lg text-[var(--foreground)] mb-4 leading-7">{data.description}</p>

                    <div className="mb-4">
                        <TagsList tags={data.tags} />
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                        <LocationIcon className="text-[var(--background-secondary)] w-6 h-6" />
                        <span className="text-lg font-medium text-[var(--foreground)]">{data.location}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-white/60">
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-600 font-semibold">Inicio</span>
                                <span className="text-base font-medium">{new Date(data.startDate).toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-white/60">
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-600 font-semibold">Finalización</span>
                                <span className="text-base font-medium">{new Date(data.endDate).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/*Section for enroll button */}
                    <div className="w-full flex flex-col items-center justify-center py-3">
                        <EnrollButton idEvent={data.id.toString()}>
                            Inscribirse {}
                        </EnrollButton>
                    </div>
                </div>

            </div>
        </div>
    );
}