/**
 * 定义koa
 */
import koa from 'koa';
import Router from '@koa/router';
/**
 * 管理koa类
 */
export declare class KoaManager {
    private static _instance;
    static get instance(): KoaManager;
    private _koa;
    private _router;
    private constructor();
    get koa(): koa;
    get router(): Router;
    start(port: number): void;
}
export declare const KoaServer: KoaManager;
