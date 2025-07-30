import { Plugin, EventType } from './types';
import { MiddlewareSystem } from './middlewareSystem';
export declare class PluginManager {
    private app;
    private eventSystem;
    middlewareSystem: MiddlewareSystem;
    loadedPlugins: Map<string, Plugin>;
    constructor(app: any);
    loadFromDirectory(dir: string): Promise<void>;
    private getPluginDirectories;
    private loadPlugin;
    private registerEventHandlers;
    private registerMiddlewares;
    emitEvent(eventType: EventType, payload: any): Promise<void>;
}
