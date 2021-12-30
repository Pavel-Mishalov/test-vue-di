class Subject {
    constructor() {
        this.subscription = [];
    }
    subscribe(callback) {
        this.subscription.push(callback);
        return () => {
            const index = this.subscription.findIndex((v) => v === callback);
            this.subscription.splice(index, 1);
        };
    }
    emit(name) {
        this.subscription.forEach((cb) => {
            cb(name);
        });
    }
}
export default new Subject();
//# sourceMappingURL=Subject.js.map