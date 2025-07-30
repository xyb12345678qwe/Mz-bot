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
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new KoaManager();
        }
        return this._instance;
    }
    _koa;
    _router;
    constructor() {
        this._koa = websocket(new koa());
        this._router = new Router();
        this._koa.use(bodyParser());
        this._koa.use(this._router.routes());
        this._koa.use(this._router.allowedMethods());
    }
    get koa() {
        return this._koa;
    }
    get router() {
        return this._router;
    }
    //开始
    start(port) {
        this._koa.listen(port, () => {
            logger.info(`[koa][server][port]:${port}`);
        });
    }
}
export const KoaServer = KoaManager.instance;
KoaServer.start(configManager.getConfig('port'));
