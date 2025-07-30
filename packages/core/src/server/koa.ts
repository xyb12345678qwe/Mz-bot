import { logger } from '@mz-botjs/logger';
import { configManager } from '@mz-botjs/config';
/**
 * 定义koa
 */
import koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import websocket from 'koa-websocket';
/**
 * 管理koa类
 */
export class KoaManager {
    private static _instance: KoaManager;
    public static get instance(): KoaManager {
        if (!this._instance) {
            this._instance = new KoaManager();
        }
        return this._instance;
    }
    private _koa: koa;
    private _router: Router;
    private constructor() {
        this._koa = websocket(new koa());
        this._router = new Router();
        this._koa.use(bodyParser());
           this._koa.use(this._router.routes());
        this._koa.use(this._router.allowedMethods());
    }
    public get koa(): koa {
        return this._koa;
    }
    public get router(): Router {
        return this._router;
    }
    //开始
    public start(port: number) {
        this._koa.listen(port, () => {
           logger.info(`[koa][server][port]:${port}`)
        });
    }
}
export const KoaServer = KoaManager.instance;
KoaServer.start(configManager.getConfig('port'))   