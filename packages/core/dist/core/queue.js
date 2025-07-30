import PQueue from 'p-queue';
export class MessageQueue {
    handler;
    queue;
    metrics = {
        processed: 0,
        errors: 0,
        lastErrorTime: 0,
        avgProcessTime: 0
    };
    constructor(handler, options = {
        concurrency: 5,
        timeout: 30_000,
        autoScale: true
    }) {
        this.handler = handler;
        this.queue = new PQueue({
            concurrency: options.concurrency ?? 5,
            timeout: options.timeout ?? 30_000,
            throwOnTimeout: true
        });
        if (options.autoScale) {
            setInterval(() => this.autoScale(), 10_000);
        }
    }
    async add(message) {
        const start = Date.now();
        try {
            await this.queue.add(() => this.handler(message));
            this.recordSuccess(Date.now() - start);
        }
        catch (err) {
            this.recordError();
            throw err; // 仍向上抛出错误
        }
    }
    setConcurrency(concurrent) {
        this.queue.concurrency = concurrent;
    }
    getStatus() {
        return {
            concurrency: this.queue.concurrency,
            pending: this.queue.pending,
            queued: this.queue.size,
            isPaused: this.queue.isPaused,
            ...this.metrics
        };
    }
    recordSuccess(processTime) {
        this.metrics.processed++;
        this.metrics.avgProcessTime =
            (this.metrics.avgProcessTime * (this.metrics.processed - 1) + processTime) /
                this.metrics.processed;
    }
    recordError() {
        this.metrics.errors++;
        this.metrics.lastErrorTime = Date.now();
    }
    autoScale() {
        const errorRate = this.metrics.errors / this.metrics.processed;
        const currentConcurrency = this.queue.concurrency;
        if (errorRate > 0.1) {
            // 错误率过高时降级
            this.setConcurrency(Math.max(1, currentConcurrency - 1));
        }
        else if (this.metrics.avgProcessTime < 50 && currentConcurrency < 20) {
            // 处理快且未达上限时扩容
            this.setConcurrency(currentConcurrency + 1);
        }
    }
}
