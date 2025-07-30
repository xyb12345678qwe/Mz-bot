import { Middleware, EventContext } from './types';

export class MiddlewareSystem {
  private middlewares: Middleware[] = [];

  use(middleware: Middleware): void {
    this.middlewares.push(middleware);
  }

  async run(ctx: EventContext): Promise<void> {
    let index = -1;
    
    const dispatch = async (i: number): Promise<void> => {
      if (i <= index) {
        throw new Error('next() called multiple times');
      }
      
      index = i;
      const middleware = this.middlewares[i];
      
      if (middleware) {
        await middleware(ctx, () => dispatch(i + 1));
      }
    };
    
    await dispatch(0);
  }
}