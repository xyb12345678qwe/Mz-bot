import { Plugin, isPlugin, EventType, EventHandler, Middleware } from './types';
import { EventSystem } from './eventSystem';
import { MiddlewareSystem } from './middlewareSystem';
import path from 'path';
import fs from 'fs/promises';
import { logger } from '@mz-botjs/logger'
export class PluginManager {
  private app:any;
  private eventSystem: EventSystem;
  public middlewareSystem: MiddlewareSystem;
  public loadedPlugins: Map<string, Plugin> = new Map();

  constructor(app: any) {
    this.app = app;
    this.eventSystem = new EventSystem();
    this.middlewareSystem = new MiddlewareSystem();
  }

  async loadFromDirectory(dir: string): Promise<void> {
    const pluginDirs = await this.getPluginDirectories(dir);
    
    for (const pluginDir of pluginDirs) {
      await this.loadPlugin(pluginDir);
    }
  }

  private async getPluginDirectories(dir: string): Promise<string[]> {
    const files = await fs.readdir(dir, { withFileTypes: true });
    return files
      .filter(dirent => dirent.isDirectory())
      .map(dirent => path.join(dir, dirent.name));
  }

  private async loadPlugin(pluginDir: string): Promise<void> {
    const pluginName = path.basename(pluginDir);
    const pluginFile = path.join(pluginDir, 'index.ts');

    try {
      const module = await import(pluginFile);
      const pluginExport = module.default;

      if (!isPlugin(pluginExport)) {
        throw new Error(`插件 ${pluginName} 不符合 Plugin 接口定义`);
      }

      const plugin: Plugin = {
        name: pluginName,
        ...pluginExport
      };

      if (this.loadedPlugins.has(plugin.name)) {
        logger.warn(`插件 ${plugin.name} 已加载，跳过重复加载`);
        return;
      }

      // 调用生命周期钩子
      if (plugin.onLoad) {
        plugin.onLoad(this.app);
      }

      // 安装插件
      if (plugin.install) {
        plugin.install(this.app);
      }

      // 注册事件处理器
      if (plugin.events) {
        this.registerEventHandlers(plugin.name, plugin.events);
      }

      // 注册中间件
      if (plugin.middlewares) {
        this.registerMiddlewares(plugin.middlewares);
      }

      this.loadedPlugins.set(plugin.name, plugin);
      logger.info(`插件 ${plugin.name} 加载成功`);

    } catch (error) {
      logger.error(`加载插件 ${pluginName} 失败:`, error);
    }
  }

  private registerEventHandlers(pluginName: string, events: Record<string, EventHandler | EventHandler[]>): void {
    for (const [eventType, handlers] of Object.entries(events)) {
      const handlerArray = Array.isArray(handlers) ? handlers : [handlers];
      
      for (const handler of handlerArray) {
        this.eventSystem.on(eventType, handler);
        logger.debug(`插件 ${pluginName} 注册了事件监听: ${String(eventType)}`);
      }
    }
  }

  private registerMiddlewares(middlewares: Middleware[]): void {
    for (const middleware of middlewares) {
      this.middlewareSystem.use(middleware);
    }
  }

  async emitEvent(eventType: EventType, payload: any): Promise<void> {
    await this.middlewareSystem.run({
      type: eventType,
      payload,
      app: this.app,
      state: {}
    });
    await this.eventSystem.emit(eventType, payload, this.app);
  }
}