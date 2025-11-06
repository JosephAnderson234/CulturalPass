export default async function EventInscriptionPage ({ params }: { params: Promise<{ idEvent: string }> }){
    const { idEvent } = await params;
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-8">Página de inscripción para el evento {idEvent}</h1>
        </div>
    );
}