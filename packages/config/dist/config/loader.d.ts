import { mz_configType } from './types.js';
import { z } from 'zod';
export declare function loadConfig(filePath: string): Promise<mz_configType>;
export declare function validateConfigPartial<T extends z.ZodObject<any>>(schema: T, partial: unknown): z.ZodSafeParseResult<Record<string, any>>;
