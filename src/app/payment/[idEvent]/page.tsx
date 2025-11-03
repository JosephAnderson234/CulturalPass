import { EventSection } from "@src/components/payment/EventSection";
import PaymentSlidesOrq from "@src/components/payment/PaymentSlidesOrq";
import { getEventById } from "@src/services/event/getById";


export default async function EventIndividualPaymentPage({ params }: { params: Promise<{ idEvent: string }> }) {
    const { idEvent } = await params;
    const data = await getEventById(idEvent);
    return (
        <div className="w-full mx-auto">
            <div className="w-10/12 mx-auto bg-background-secondary/85 shadow-2xl shadow-background-secondary/85 my-10 p-10 rounded-3xl flex flex-row gap-10">
                <div className="w-1/4">
                    <EventSection event={data} />
                </div>
                <div className="w-3/4 overflow-hidden">
                    <PaymentSlidesOrq />
                </div>
            </div>
        </div>
    );
}