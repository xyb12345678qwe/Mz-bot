import { APP } from 'core';
/**
 * 适配器工厂
 */
export class AdapterFactory {
    Adapters = new Map();
    /**
     * 注册
     */
    register(name, id, adapter) {
        if (!this.Adapters.has(name)) {
            this.Adapters.set(name, new Map());
        }
        this.Adapters.get(name)?.set(id, adapter);
        return this;
    }
    /**
     * 启动
     */
    start(name, id) {
        const adapter = this.Adapters.get(name)?.get(id);
        if (!adapter) {
            throw Error(`not Found name '${name}' id '${id}' Bot adapter`);
        }
        adapter.receive((messages) => {
            const { raw_message, message } = messages;
            if (message.type.includes('message_create')) {
                APP.emit('message_create', {
                    ...message
                });
                APP.emit(message.type, {
                    ...message,
                });
            }
        });
    }
}
export const adapterFactory = new AdapterFactory();
