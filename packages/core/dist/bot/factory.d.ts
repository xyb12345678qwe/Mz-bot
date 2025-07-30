import { Adapter } from './adapter';
/**
 * 适配器工厂
 */
export declare class AdapterFactory {
    Adapters: Map<any, any>;
    /**
     * 注册
     */
    register(name: string, id: string, adapter: Adapter): this;
    /**
     * 启动
     */
    start(name: string, id: string): void;
}
export declare const adapterFactory: AdapterFactory;
