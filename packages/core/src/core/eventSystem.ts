import { EventType, EventHandler, EventContext } from './types';

export class EventSystem {
  private handlers: Map<EventType, Set<EventHandler>> = new Map();

  on(eventType: EventType, handler: EventHandler): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    this.handlers.get(eventType)?.add(handler);
  }

  off(eventType: EventType, handler: EventHandler): void {
    this.handlers.get(eventType)?.delete(handler);
  }

  async emit(eventType: EventType, payload: any, app: any): Promise<void> {
    const ctx: EventContext = {
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

  removeAllListeners(eventType?: EventType): void {
    if (eventType) {
      this.handlers.delete(eventType);
    } else {
      this.handlers.clear();
    }
  }
}