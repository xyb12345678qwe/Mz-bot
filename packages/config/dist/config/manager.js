import { MZConfigSchema } from './types.js';
import EventEmitter from 'events';
import chokidar from 'chokidar';
import { loadConfig } from './loader.js';
import { logger } from '@mz-botjs/logger';
export class ConfigManager extends EventEmitter {
    filePath;
    config;
    watcher;
    constructor(filePath) {
        super();
        this.filePath = filePath;
    }
    async init() {
        await this.reload();
        this.setupWatcher();
        return this;
    }
    async reload() {
        try {
            const newConfig = await loadConfig(this.filePath);
            this.config = newConfig;
            this.emit('update', newConfig);
        }
        catch (err) {
            this.emit('error', err);
        }
    }
    setupWatcher() {
        this.watcher = chokidar.watch(this.filePath)
            .on('change', () => this.reload());
    }
    getConfig(key) {
        return key !== undefined ? this.config[key] : this.config;
    }
    updateBotConfig(index, partial) {
        const updated = { ...this.config };
        const mergedBot = { ...updated.bot[index], ...partial };
        updated.bot[index] = MZConfigSchema.shape.bot.element.parse(mergedBot);
        this.config = MZConfigSchema.parse(updated);
        this.emit('botUpdate', index, this.config.bot[index]);
    }
    dispose() {
        this.watcher?.close();
    }
}
import path from 'path';
import fs from 'fs/promises';
// 支持的配置文件扩展名（按优先级排序）
const CONFIG_EXTENSIONS = ['js', 'json', 'ts'];
/**
 * 检测并返回有效的配置文件路径
 */
async function resolveConfigPath() {
    for (const ext of CONFIG_EXTENSIONS) {
        const filePath = path.join(process.cwd(), `mz_config.${ext}`);
        try {
            await fs.access(filePath, fs.constants.R_OK);
            logger.info(`Configuration file detected: ${filePath}`);
            return filePath;
        }
        catch {
            continue; // 文件不可读则尝试下一个扩展名
        }
    }
    return null;
}
/**
 * 安全加载配置管理器
 */
export async function createConfigManager() {
    const configPath = await resolveConfigPath();
    if (!configPath) {
        const err = new Error('No valid configuration file found');
        logger.error(err.message, {
            searched: CONFIG_EXTENSIONS.map(ext => `mz_config.${ext}`)
        });
        throw err;
    }
    try {
        const manager = new ConfigManager(configPath);
        await manager.init(); // 异步初始化
        return manager;
    }
    catch (err) {
        logger.error('Failed to initialize config manager', {
            path: configPath,
            error: err instanceof Error ? err.message : String(err)
        });
        throw err;
    }
}
// 使用示例
export const configManager = await createConfigManager();
