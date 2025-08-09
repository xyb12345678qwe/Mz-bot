import { Adapter } from '@mz-botjs/core';
export declare class OneBotV11Adapter extends Adapter {
    private readonly wss;
    private queue;
    private callbacks;
    private responseHandlers;
    /**
     * @param wss WebSocket服务器实例
     */
    constructor(wss: any);
    /**
     * 接收消息并触发回调
     * @param callback 消息回调函数
     */
    receive(callback?: Function): void;
    /**
     * 构造并发送消息，返回一个 Promise 等待响应
     * @param action 请求动作类型
     * @param params 请求参数
     * @param echo 请求标识符，用于匹配响应
     * @param timeout 超时时间（毫秒），默认 5000ms
     */
    createSend(action: string, params: any, echo: number, timeout?: number): Promise<any>;
    sendMessage(message_type: string, group_id: number, user_id: number, message: any): Promise<any>;
    getQQavatar(qq: string | number): string;
    handleMessage(this: any, message: any): any;
    /**
     * 处理发送消息
     */
    handleReply(message: any): any;
    /**
     * 关闭连接
     */
    close(): void;
}
