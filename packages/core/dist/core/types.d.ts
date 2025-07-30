export type EventType = string | symbol;
export interface EventContext {
    type: EventType;
    payload: any;
    app: any;
    state: Record<string, any>;
}
export type EventHandler = (ctx: EventContext) => Promise<void> | void;
export type Middleware = (ctx: EventContext, next: () => Promise<void>) => Promise<void>;
export interface Plugin {
    name: string;
    version?: string;
    description?: string;
    install?: (app: any) => void;
    events?: {
        [eventType: string]: EventHandler | EventHandler[];
    };
    middlewares?: Middleware[];
    onLoad?: (app: any) => void;
    onUnload?: (app: any) => void;
}
export declare function isPlugin(obj: any): obj is Plugin;
