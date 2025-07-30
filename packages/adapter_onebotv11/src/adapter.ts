import { Adapter, MessageQueue } from '@mz-botjs/core'
import { Count } from './count.js'
import { logger } from '@mz-botjs/logger'

export class OneBotV11Adapter extends Adapter {
    private readonly wss;
    private queue: MessageQueue<any> = new MessageQueue<string>(this.handleMessage.bind(this))
    private callbacks = []
    /**
     * @param wss WebSocket服务器实例
     */
    constructor(wss) {
        super('onebotv11');
        this.wss = wss;
        this.wss.on('message', async (msg) => {
            this.handleMessage(msg);
        })
    }

    /**
     * 接收消息并触发回调
     * @param callback 消息回调函数
     */
    receive(callback?: Function) {
        if (callback) {
            this.callbacks.push(callback)
        }
    }
    /**
     * 构造并发送消息，返回一个 Promise 等待响应
     * @param action 请求动作类型
     * @param params 请求参数
     * @param echo 请求标识符，用于匹配响应
     * @param timeout 超时时间（毫秒），默认 5000ms
     */
    createSend(action: string, params: any, echo: number, timeout = 5000): Promise<any> {
        return new Promise((resolve, reject) => {
            // 检查 WebSocket 连接状态
            if (this.wss.readyState !== WebSocket.OPEN) {
                return reject(new Error('WebSocket 连接未就绪'));
            }

            // 发送消息
            this.wss.send(JSON.stringify({ action, params, echo }));

            // 临时消息处理器
            const messageHandler = (message: any) => {
                if (message?.echo === echo) {
                    cleanup();
                    resolve(message);
                }
            };

            // 错误处理器
            const errorHandler = (err: Error) => {
                cleanup();
                reject(err);
            };


            // 清理函数
            const cleanup = () => {
                this.wss.off('message', messageHandler);
                this.wss.off('error', errorHandler);
            };

            // 添加监听器
            this.wss.on('message', messageHandler);
            this.wss.on('error', errorHandler);
        });
    }
    public sendMessage(message_type: string, group_id: number, user_id: number, message: any) {
        return this.createSend('send_msg', {
            message_type,
            group_id,
            user_id,
            message
        }, Count.getAddOneCount());
    }
    getQQavatar(qq: string | number) {
        return `https://q1.qlogo.cn/g?b=qq&s=0&nk=${qq}`;
    }
    handleMessage(this,message: any) {
        //buffer转字符串
        if (Buffer.isBuffer(message)) {
            message = message.toString('utf-8');
        }
        //解析JSON字符串
        try {
            message = JSON.parse(message);
        }
        catch (e) {
            logger.error(`[onebotv11]解析消息失败: ${e.message}`);
            return null;
        }
        const parsedMessage = message;
        const self_id = parsedMessage.self_id;
        // 判断心跳
        if (parsedMessage?.post_type === 'heartbeat') {
            logger.info(`[onebotv11][${self_id}]收到心跳消息`);
            return null;
        } else if (parsedMessage?.post_type === 'message') {
            // 处理消息
            if (parsedMessage.message_type) {
                const e = {
                    platform: 'onebotv11',
                    time: parsedMessage.time,
                    type: `message_create_${parsedMessage.message_type}`, // message_create_private message_create_group
                    group_id: parsedMessage.group_id,
                    user_id: parsedMessage.user_id,
                    user_avatar: this.getQQavatar(parsedMessage.user_id),
                    message: parsedMessage.message,
                    message_type: parsedMessage.message_type,
                    bot: {
                        id: self_id,
                        //qq头像
                        avatar: this.getQQavatar(self_id),
                    },
                    sub_type: parsedMessage.sub_type,
                    message_id: parsedMessage.message_id,
                    raw_message: parsedMessage.raw_message,
                    font: parsedMessage?.font,
                    nickname: parsedMessage.sender.nickname,
                    level: parsedMessage.sender?.level,
                    role: parsedMessage.sender?.role,
                    title: parsedMessage.sender?.title,
                    sex: parsedMessage.sender?.sex,
                    age: parsedMessage.sender?.age,
                    UserText: parsedMessage.raw_message,
                    anonymous: parsedMessage?.anonymous,
                    reply: null,
                };
                e.reply = async (msg) =>{
                    //判断msg是否数组
                    if (Array.isArray(msg)) {
                        await this.sendMessage(parsedMessage.message_type, parsedMessage.group_id, parsedMessage.user_id, msg)
                    } else if (msg.constructor === Object) {
                        await this.sendMessage(parsedMessage.message_type, parsedMessage.group_id, parsedMessage.user_id, [msg])
                    } else {
                        await this.sendMessage(parsedMessage.message_type, parsedMessage.group_id, parsedMessage.user_id, msg)
                    }
                }
                logger.info(`[onebotv11][Bot(${parsedMessage.self_id})][receive][${e.type}][QQ(${e.user_id})][${`群${e.group_id}` || "私聊"}]:${e.raw_message}`);
                for (let callback of this.callbacks) {
                    callback({
                        raw_message: parsedMessage,
                        message: e
                    })
                }
            }

        }
    }
    /**
     * 关闭连接
     */
    close(): void {
        this.wss.close();
    }
}