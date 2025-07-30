import { z } from 'zod';
export declare const OneBotV11Schema: z.ZodObject<{
    url: z.ZodDefault<z.ZodString>;
    enable: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type onebotv11 = z.infer<typeof OneBotV11Schema>;
export declare const QQConfigSchema: z.ZodObject<{
    appid: z.ZodString;
    secret: z.ZodString;
    intend: z.ZodDefault<z.ZodArray<z.ZodString>>;
    enable: z.ZodBoolean;
    sandbox: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type qqConfigType = z.infer<typeof QQConfigSchema>;
export declare const BotConfigSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"onebotv11">;
    config: z.ZodObject<{
        url: z.ZodDefault<z.ZodString>;
        enable: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"qq">;
    config: z.ZodObject<{
        appid: z.ZodString;
        secret: z.ZodString;
        intend: z.ZodDefault<z.ZodArray<z.ZodString>>;
        enable: z.ZodBoolean;
        sandbox: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>;
    clusters: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>]>;
export type BotConfig = z.infer<typeof BotConfigSchema>;
export declare const MZConfigSchema: z.ZodObject<{
    port: z.ZodDefault<z.ZodNumber>;
    bot: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"onebotv11">;
        config: z.ZodObject<{
            url: z.ZodDefault<z.ZodString>;
            enable: z.ZodDefault<z.ZodBoolean>;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"qq">;
        config: z.ZodObject<{
            appid: z.ZodString;
            secret: z.ZodString;
            intend: z.ZodDefault<z.ZodArray<z.ZodString>>;
            enable: z.ZodBoolean;
            sandbox: z.ZodDefault<z.ZodBoolean>;
        }, z.core.$strip>;
        clusters: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>]>>;
    logLevel: z.ZodDefault<z.ZodEnum<{
        debug: "debug";
        info: "info";
        warn: "warn";
    }>>;
}, z.core.$strip>;
export type mz_configType = z.infer<typeof MZConfigSchema>;
