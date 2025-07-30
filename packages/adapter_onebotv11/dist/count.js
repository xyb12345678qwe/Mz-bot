export class Count {
    static count = 0;
    static getAddOneCount() {
        return this.count += 1;
    }
}
