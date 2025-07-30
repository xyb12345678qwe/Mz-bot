import { mz_configType, MZConfigSchema } from './types.js';
import { z } from 'zod';
import fs from 'fs';
export async function loadConfig(filePath: string): Promise<mz_configType> {
  // 支持 JSON/JS/TS 配置
  const content = await fs.promises.readFile(filePath, 'utf-8');
  const rawConfig = filePath.endsWith('.json') 
    ? JSON.parse(content)
    : (await import(filePath)).default;

  // 运行时验证
  return MZConfigSchema.parse(rawConfig);
}

export function validateConfigPartial<T extends z.ZodObject<any>>(schema: T, partial: unknown) {
  return schema.partial().safeParse(partial);
}