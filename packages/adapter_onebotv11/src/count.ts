export class Count {
    static count = 0;
    static getAddOneCount(): number { 
        return this.count += 1
    }
}