import { Middleware, EventContext } from './types';
export declare class MiddlewareSystem {
    private middlewares;
    use(middleware: Middleware): void;
    run(ctx: EventContext): Promise<void>;
}
