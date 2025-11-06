import dataNavBar1 from '@src/data/dashbaord.json';
import { EventCard } from '../common/Cards';
import { EventResponse } from '@src/interfaces/event/EventResponse';
import MiniBanner from '../home/MiniBanner';
import { getNearestConcert } from '@src/services/event/filters';

export const PublicLayer = async () => {
    //aqui irian los datos fetcheados, pero por implementación se harán con datos estáticos

    const concertNearest = await getNearestConcert();

    return (
        <div className='w-full max-w-7xl mx-auto pt-10'>

            <div className='w-full'>
                <MiniBanner />
            </div>

            <div className='text-center text-xl my-10'>
                Descubre lo más reciente en conciertos:
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto mx-auto my-6 pb-4  px-6'>
                {
                    concertNearest.map((event) => (
                        <EventCard key={event.id} data={event as unknown as EventResponse} />
                    ))
                }
            </div>
        </div>
    )
}
