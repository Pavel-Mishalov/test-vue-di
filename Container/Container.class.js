class Container {
    constructor() {
        this.__initializeList = new Map();
        this.__cache = new Map();
    }
    set(constructor, fn) {
        if (this.__initializeList.has(constructor)) {
            console.warn('@di: Error, register class second times');
        }
        this.__initializeList.set(constructor, fn);
    }
    register(constructor) {
        if (!this.__initializeList.has(constructor)) {
            console.warn('@di: Error, get unregister class');
        }
        if (this.__initializeList.has(constructor)) {
            this.__cache.set(constructor, this.__initializeList.get(constructor)());
        }
    }
    get(resource) {
        if (!this.__cache.has(resource)) {
            this.register(resource);
        }
        return this.__cache.get(resource);
    }
}
export default new Container();
//# sourceMappingURL=Container.class.js.map