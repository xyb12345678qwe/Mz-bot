import { z } from 'zod';

// OneBot V11 协议配置
export const OneBotV11Schema = z.object({
  url: z.string().default('/onebotv11'),
  enable: z.boolean().default(true),
});
export type onebotv11 = z.infer<typeof OneBotV11Schema>;

// QQ 配置
export const QQConfigSchema = z.object({
  appid: z.string().length(16).regex(/^\d+$/),
  secret: z.string().min(32),
  intend: z.array(z.string()).default([]),
  enable: z.boolean(),
  sandbox: z.boolean().default(false)
});
export type qqConfigType = z.infer<typeof QQConfigSchema>;

// 机器人配置联合类型
export const BotConfigSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('onebotv11'),
    config: OneBotV11Schema
  }),
  z.object({
    type: z.literal('qq'),
    config: QQConfigSchema,
    clusters: z.array(z.string()).optional() // 允许集群配置
  })
]);
export type BotConfig = z.infer<typeof BotConfigSchema>;

// 主配置结构
export const MZConfigSchema = z.object({
  port: z.number().int().min(1024).max(65535).default(3144),
  bot: z.array(BotConfigSchema).nonempty(),
  logLevel: z.enum(['debug', 'info', 'warn']).default('info'),
});
export type mz_configType = z.infer<typeof MZConfigSchema>;

