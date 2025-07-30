export class EventSystem {
    handlers = new Map();
    on(eventType, handler) {
        if (!this.handlers.has(eventType)) {
            this.handlers.set(eventType, new Set());
        }
        this.handlers.get(eventType)?.add(handler);
    }
    off(eventType, handler) {
        this.handlers.get(eventType)?.delete(handler);
    }
    async emit(eventType, payload, app) {
        const ctx = {
            type: eventType,
            payload,
            app,
            state: {}
        };
        const handlers = this.handlers.get(eventType);
        if (handlers) {
            for (const handler of handlers) {
                await handler(ctx);
            }
        }
    }
    removeAllListeners(eventType) {
        if (eventType) {
            this.handlers.delete(eventType);
        }
        else {
            this.handlers.clear();
        }
    }
}
