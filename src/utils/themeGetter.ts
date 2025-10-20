import { EventType } from "@src/interfaces/event/enums";

export const getThemeTypeEvent = (typeEvent: EventType): string => {
    switch (typeEvent) {
        case EventType.CONFERENCIA:
            return "bg-blue-500";
        case EventType.TALLER:
            return "bg-green-500";
        case EventType.EXPOSICION:
            return "bg-yellow-500";
        case EventType.CONCIERTO:
            return "bg-purple-500";
        case EventType.OBRA_DE_TEATRO:
            return "bg-red-500";
        case EventType.PROYECCION:
            return "bg-pink-500";
        case EventType.FERIA:
            return "bg-orange-500";
        default:
            return "bg-gray-500";
    }
}