import { configManager } from '@mz-botjs/config'
import { KoaServer, adapterFactory } from '@mz-botjs/core'
import { logger } from '@mz-botjs/logger'
import { OneBotV11Adapter } from './adapter.js'
export class OneBotv11Ws {
    OneBotv11Config: any
    constructor() {
        const bots = configManager.getConfig('bot')
        for (const bot of bots) {
            if (bot.type == 'onebotv11') {
                this.OneBotv11Config = bot
            }
        }
    }
    connect() {

        if (this.OneBotv11Config && this.OneBotv11Config.config.enable) {
            //判断路径
            const configUrl = this.OneBotv11Config.config.url?.replace(/^\/+/, '') || 'onebotv11';
            logger.info(`[onebotv11][ws][start][on]:ws//localhost:端口/${configUrl}`)
            //开启ws
            KoaServer.koa.ws.use(async (ctx, next) => {
                if (ctx.path.replace(/^\/+/, '') === configUrl) {
                    logger.info(`[onebotv11][ws][connected]:${ctx.path}`)
                    ctx.websocket.once('message', (message) => {
                        const self_id = JSON.parse(message).self_id;
                        // 注册适配器
                        adapterFactory.register(
                            'onebotv11',
                            self_id,
                            new OneBotV11Adapter(ctx.websocket)
                        ).start('onebotv11', self_id);
                    });

                } else {
                    logger.warn(`[onebotv11][ws][connected]: 接受到非onebotv11的ws连接请求: ${ctx.path}`)
                }
            })

        }
    }
}
new OneBotv11Ws().connect()  