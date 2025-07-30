import { EventType, EventHandler } from './types';
export declare class EventSystem {
    private handlers;
    on(eventType: EventType, handler: EventHandler): void;
    off(eventType: EventType, handler: EventHandler): void;
    emit(eventType: EventType, payload: any, app: any): Promise<void>;
    removeAllListeners(eventType?: EventType): void;
}
