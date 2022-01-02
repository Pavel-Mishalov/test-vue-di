class Container {
    constructor() {
        this.__initializeList = {
            singleton: new Map(),
            keys: new Map(),
            multiple: new Map()
        };
        this.__cache = {
            singleton: new Map(),
            keys: {}
        };
    }
    set(constructor, fn, type) {
        if (this.__initializeList[type].has(constructor)) {
            console.warn('@di: Error, register class second times');
        }
        this.__initializeList[type].set(constructor, fn);
    }
    register(constructor, key) {
        const isKeyNeed = !!key && key === 'keys';
        if (isKeyNeed) {
            this.registerToKeys(constructor, key);
        }
        else {
            this.registerToSingleton(constructor);
        }
    }
    get(resource, key) {
        const isKeyNeed = !!key && key === 'keys';
        if (isKeyNeed) {
            return this.getByKey(resource, key);
        }
        return this.getSingletonClass(resource);
    }
    getByKey(resource, key) {
        const isKeyNeed = !!key && key === 'keys';
        const cache = isKeyNeed ? this.__cache.keys : this.__cache.singleton;
        if (!(key in this.__cache.keys) || !this.__cache.keys[key].has(resource)) {
            this.register(resource, key);
        }
        return this.__cache.keys[key].get(resource);
    }
    getSingletonClass(resource) {
        if (!this.__cache.singleton.has(resource)) {
            this.register(resource);
        }
        return this.__cache.singleton.get(resource);
    }
    registerToKeys(constructor, key) {
        if (!this.__initializeList.keys.has(constructor)) {
            console.warn('@di [Container.registerToKeys]: Error, get unregister class');
        }
        if (this.__initializeList.keys.has(constructor)) {
            if (!(key in this.__cache.keys)) {
                this.__cache.keys[key] = new Map();
            }
            this.__cache.keys[key].set(constructor, this.__initializeList.keys.get(constructor)());
        }
    }
    registerToSingleton(constructor) {
        if (!this.__initializeList.singleton.has(constructor)) {
            console.warn('@di [Container.registerToSingleton]: Error, get unregister class');
        }
        if (this.__initializeList.singleton.has(constructor)) {
            this.__cache.singleton.set(constructor, this.__initializeList.singleton.get(constructor)());
        }
    }
    toJSON() {
        return {
            ...this,
            diClassInstance: 'Container'
        };
    }
}
export default new Container();
//# sourceMappingURL=Container.class.js.map