// 类型守卫
export function isPlugin(obj) {
    return (typeof obj === 'object' &&
        typeof obj.name === 'string' &&
        (typeof obj.install === 'function' ||
            typeof obj.events === 'object' ||
            Array.isArray(obj.middlewares)));
}
