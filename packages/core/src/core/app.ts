import { PluginManager } from './pluginManager';
import { Middleware, Plugin } from './types';
import path from 'path'
export class App {
  private pluginManager: PluginManager;

  constructor() {
    this.pluginManager = new PluginManager(this);
  }

  async loadPlugins(dir: string): Promise<void> {
    await this.pluginManager.loadFromDirectory(dir);
  }

  async emit(eventType: string, payload: any): Promise<void> {
    await this.pluginManager.emitEvent(eventType, payload);
  }

  async useMiddleWare(func:Middleware){
    await this.pluginManager.middlewareSystem.use(func)
  }
  async getPlugin(name:string){
    return await this.pluginManager.loadedPlugins.get(name)
  }
}

export const APP = new App();

await APP.loadPlugins(path.join(process.cwd(),'plugins'))