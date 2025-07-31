/**
 * 创建文本消息
 * @param content 文本内容
 * @param options 可选样式配置
 */
export function Text(content, options) {
    return {
        type: 'text',
        data: {
            text: content,
            ...options
        }
    };
}
/**
 * 创建图片消息
 * @param source 图片源（URL/本地路径/Buffer）
 * @param options 高级选项
 */
export function Image(source, options) {
    return {
        type: 'image',
        data: {
            file: source,
            ...options
        }
    };
}
/**
 * 消息链构造器（链式调用）
 */
export class MessageBuilder {
    segments = [];
    /**
     * 添加文本消息
     */
    text(content, options) {
        this.segments.push(Text(content, options));
        return this;
    }
    /**
     * 添加图片消息
     */
    image(source, options) {
        this.segments.push(Image(source, options));
        return this;
    }
    /**
     * 生成最终消息数组
     */
    build() {
        return [...this.segments];
    }
}
export function Template(tpl, vars) {
    let text = tpl;
    for (const [key, val] of Object.entries(vars)) {
        text = text.replace(new RegExp(`\\$${key}`, 'g'), val);
    }
    return Text(text);
}
// export function validateMessage(msg: unknown) {
//   return TextSchema.safeParse(msg);
// }
