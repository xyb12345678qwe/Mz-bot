import { BotConfig, MZConfigSchema, mz_configType } from './types.js';
import EventEmitter from 'events';
import chokidar, { FSWatcher } from 'chokidar';
import { loadConfig } from './loader.js';
import { logger } from '@mz-botjs/logger'
export class ConfigManager extends EventEmitter {
  private config!: mz_configType;
  private watcher?: FSWatcher;

  constructor(private filePath: string) {
    super();
  }

  async init() {
    await this.reload();
    this.setupWatcher();
    return this;
  }

  private async reload() {
    try {
      const newConfig = await loadConfig(this.filePath);
      this.config = newConfig;
      this.emit('update', newConfig);
    } catch (err) {
      this.emit('error', err);
    }
  }

  private setupWatcher() {
    this.watcher = chokidar.watch(this.filePath)
      .on('change', () => this.reload());
  }

  getConfig(): mz_configType;
  getConfig<T extends keyof mz_configType>(key: T): mz_configType[T];
  getConfig<T extends keyof mz_configType>(key?: T): mz_configType | mz_configType[T] {
    return key !== undefined ? this.config[key] : this.config;
  }

  updateBotConfig(index: number, partial: Partial<BotConfig>) {
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
const CONFIG_EXTENSIONS = ['js', 'json','ts'] as const;

/**
 * 检测并返回有效的配置文件路径
 */
async function resolveConfigPath(): Promise<string | null> {
  for (const ext of CONFIG_EXTENSIONS) {
    const filePath = path.join(process.cwd(), `mz_config.${ext}`);
    try {
      await fs.access(filePath, fs.constants.R_OK);
      logger.info(`Configuration file detected: ${filePath}`);
      return filePath;
    } catch {
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
  } catch (err) {
    logger.error('Failed to initialize config manager', { 
      path: configPath,
      error: err instanceof Error ? err.message : String(err)
    });
    throw err;
  }
}

// 使用示例
export const configManager = await createConfigManager();
