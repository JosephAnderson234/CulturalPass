import dataNavBar1 from '@src/data/dashbaord.json';
import { EventCard } from '../common/Cards';
import { EventResponse } from '@src/interfaces/event/EventResponse';
import MiniBanner from '../home/MiniBanner';

export const PublicLayer = () => {
    //aqui irian los datos fetcheados, pero por implementación se harán con datos estáticos
    return (
        <div className='w-full max-w-7xl mx-auto pt-10'>

            <div className='w-full'>
                <MiniBanner />
            </div>

            <div className='text-center text-xl my-10'>
                Tabla de eventos más cen 
            </div>
            <div className='flex flex-row gap-4 overflow-x-auto mx-auto my-6 pb-4  px-6'>
                {
                    dataNavBar1.map((event) => (
                        <EventCard key={event.id} data={event as unknown as EventResponse} />
                    ))
                }
            </div>
        </div>
    )
}
