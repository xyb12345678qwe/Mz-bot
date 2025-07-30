export type EventType = string | symbol;

export interface EventContext {
  type: EventType;
  payload: any;
  app: any;
  state: Record<string, any>;
}

export type EventHandler = (ctx: EventContext) => Promise<void> | void;
export type Middleware = (ctx: EventContext, next: () => Promise<void>) => Promise<void>;

export interface Plugin {
  name: string;
  version?: string;
  description?: string;
  
  // Koa风格安装方法
  install?: (app: any) => void;
  
  // 事件订阅
  events?: {
    [eventType: string]: EventHandler | EventHandler[];
  };
  
  // 中间件
  middlewares?: Middleware[];
  
  // 生命周期钩子
  onLoad?: (app: any) => void;
  onUnload?: (app: any) => void;
}

// 类型守卫
export function isPlugin(obj: any): obj is Plugin {
  return (
    typeof obj === 'object' &&
    typeof obj.name === 'string' &&
    (typeof obj.install === 'function' || 
     typeof obj.events === 'object' ||
     Array.isArray(obj.middlewares))
  );
}