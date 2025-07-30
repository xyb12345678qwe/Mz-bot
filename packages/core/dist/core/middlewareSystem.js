export class MiddlewareSystem {
    middlewares = [];
    use(middleware) {
        this.middlewares.push(middleware);
    }
    async run(ctx) {
        let index = -1;
        const dispatch = async (i) => {
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
