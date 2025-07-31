
/**
 * 创建文本消息
 * @param content 文本内容
 * @param options 可选样式配置
 */
export function Text(
  content: string,
  options?: {
   
  }
) {
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
export function Image(
  source: string | Buffer,
  options?: {
    url?: string;      // 备用URL
    cache?: boolean;   // 是否缓存
    timeout?: number;  // 下载超时(ms)
  }
){
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
  private segments = [];

  /**
   * 添加文本消息
   */
  text(content: string, options?: Parameters<typeof Text>[1]) {
    this.segments.push(Text(content, options));
    return this;
  }

  /**
   * 添加图片消息
   */
  image(source: string | Buffer, options?: Parameters<typeof Image>[1]) {
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

export function Template(tpl: string, vars: Record<string, string>) {
  let text = tpl;
  for (const [key, val] of Object.entries(vars)) {
    text = text.replace(new RegExp(`\\$${key}`, 'g'), val);
  }
  return Text(text);
}

// Template('欢迎 $user 加入！', { user: 'Alice' })