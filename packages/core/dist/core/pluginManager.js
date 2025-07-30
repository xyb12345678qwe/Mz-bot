import { isPlugin } from './types';
import { EventSystem } from './eventSystem';
import { MiddlewareSystem } from './middlewareSystem';
import path from 'path';
import fs from 'fs/promises';
import { logger } from '@mz-botjs/logger';
export class PluginManager {
    app;
    eventSystem;
    middlewareSystem;
    loadedPlugins = new Map();
    constructor(app) {
        this.app = app;
        this.eventSystem = new EventSystem();
        this.middlewareSystem = new MiddlewareSystem();
    }
    async loadFromDirectory(dir) {
        const pluginDirs = await this.getPluginDirectories(dir);
        for (const pluginDir of pluginDirs) {
            await this.loadPlugin(pluginDir);
        }
    }
    async getPluginDirectories(dir) {
        const files = await fs.readdir(dir, { withFileTypes: true });
        return files
            .filter(dirent => dirent.isDirectory())
            .map(dirent => path.join(dir, dirent.name));
    }
    async loadPlugin(pluginDir) {
        const pluginName = path.basename(pluginDir);
        const pluginFile = path.join(pluginDir, 'index.ts');
        try {
            const module = await import(pluginFile);
            const pluginExport = module.default;
            if (!isPlugin(pluginExport)) {
                throw new Error(`插件 ${pluginName} 不符合 Plugin 接口定义`);
            }
            const plugin = {
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
        }
        catch (error) {
            logger.error(`加载插件 ${pluginName} 失败:`, error);
        }
    }
    registerEventHandlers(pluginName, events) {
        for (const [eventType, handlers] of Object.entries(events)) {
            const handlerArray = Array.isArray(handlers) ? handlers : [handlers];
            for (const handler of handlerArray) {
                this.eventSystem.on(eventType, handler);
                logger.debug(`插件 ${pluginName} 注册了事件监听: ${String(eventType)}`);
            }
        }
    }
    registerMiddlewares(middlewares) {
        for (const middleware of middlewares) {
            this.middlewareSystem.use(middleware);
        }
    }
    async emitEvent(eventType, payload) {
        await this.middlewareSystem.run({
            type: eventType,
            payload,
            app: this.app,
            state: {}
        });
        await this.eventSystem.emit(eventType, payload, this.app);
    }
}
