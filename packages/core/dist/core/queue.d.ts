type Handler<T> = (message: T) => Promise<void>;
export declare class MessageQueue<T = any> {
    private handler;
    private queue;
    private metrics;
    constructor(handler: Handler<T>, options?: {
        concurrency?: number;
        timeout?: number;
        autoScale?: boolean;
    });
    add(message: T): Promise<void>;
    setConcurrency(concurrent: number): void;
    getStatus(): {
        processed: number;
        errors: number;
        lastErrorTime: number;
        avgProcessTime: number;
        concurrency: number;
        pending: number;
        queued: number;
        isPaused: boolean;
    };
    private recordSuccess;
    private recordError;
    private autoScale;
}
export {};
