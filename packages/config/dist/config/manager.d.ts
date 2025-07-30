import { BotConfig, mz_configType } from './types.js';
import EventEmitter from 'events';
export declare class ConfigManager extends EventEmitter {
    private filePath;
    private config;
    private watcher?;
    constructor(filePath: string);
    init(): Promise<this>;
    private reload;
    private setupWatcher;
    getConfig(): mz_configType;
    getConfig<T extends keyof mz_configType>(key: T): mz_configType[T];
    updateBotConfig(index: number, partial: Partial<BotConfig>): void;
    dispose(): void;
}
/**
 * 安全加载配置管理器
 */
export declare function createConfigManager(): Promise<ConfigManager>;
export declare const configManager: ConfigManager;
