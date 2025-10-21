import dataNavBar1 from '@src/data/dashbaord.json';
import dataNavBar2 from '@src/data/extraDashboard.json';
import { EventCard } from '../common/Cards';
import { EventResponse } from '@src/interfaces/event/EventResponse';

export const PublicLayer = () => {
    //aqui irian los datos fetcheados, pero por implementación se harán con datos estáticos
    return (
        <div className='w-full'>
            <div>
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
