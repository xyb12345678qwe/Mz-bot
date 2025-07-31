/**
 * 创建文本消息
 * @param content 文本内容
 * @param options 可选样式配置
 */
export declare function Text(content: string, options?: {}): {
    type: string;
    data: {
        text: string;
    };
};
/**
 * 创建图片消息
 * @param source 图片源（URL/本地路径/Buffer）
 * @param options 高级选项
 */
export declare function Image(source: string | Buffer, options?: {
    url?: string;
    cache?: boolean;
    timeout?: number;
}): {
    type: string;
    data: {
        url?: string;
        cache?: boolean;
        timeout?: number;
        file: string | Buffer<ArrayBufferLike>;
    };
};
/**
 * 消息链构造器（链式调用）
 */
export declare class MessageBuilder {
    private segments;
    /**
     * 添加文本消息
     */
    text(content: string, options?: Parameters<typeof Text>[1]): this;
    /**
     * 添加图片消息
     */
    image(source: string | Buffer, options?: Parameters<typeof Image>[1]): this;
    /**
     * 生成最终消息数组
     */
    build(): any[];
}
export declare function Template(tpl: string, vars: Record<string, string>): {
    type: string;
    data: {
        text: string;
    };
};
