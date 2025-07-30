import { PluginManager } from './pluginManager';
import path from 'path';
export class App {
    pluginManager;
    constructor() {
        this.pluginManager = new PluginManager(this);
    }
    async loadPlugins(dir) {
        await this.pluginManager.loadFromDirectory(dir);
    }
    async emit(eventType, payload) {
        await this.pluginManager.emitEvent(eventType, payload);
    }
    async useMiddleWare(func) {
        await this.pluginManager.middlewareSystem.use(func);
    }
    async getPlugin(name) {
        return await this.pluginManager.loadedPlugins.get(name);
    }
}
export const APP = new App();
await APP.loadPlugins(path.join(process.cwd(), 'plugins'));
