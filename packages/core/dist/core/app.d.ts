import { Middleware, Plugin } from './types';
export declare class App {
    private pluginManager;
    constructor();
    loadPlugins(dir: string): Promise<void>;
    emit(eventType: string, payload: any): Promise<void>;
    useMiddleWare(func: Middleware): Promise<void>;
    getPlugin(name: string): Promise<Plugin>;
}
export declare const APP: App;
