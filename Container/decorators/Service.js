import { Constant, PREFIX_LENGTH } from "../constant";
import Container from "../Container.class";
import Subject from "../helpers/Subject";
function DeepProxy(target, handler) {
    if (typeof target === 'object' && target) {
        if (!Array.isArray(target)) {
            for (let k of Object.keys(target)) {
                // @ts-ignore
                if (typeof target[k] === 'object') {
                    // @ts-ignore
                    target[k] = DeepProxy(target[k], handler);
                }
            }
        }
        return new Proxy(target, handler);
    }
    else {
        return target;
    }
}
export const Service = (options = { type: 'singleton' }) => (target) => {
    Container.set(target, () => {
        // @ts-ignore
        const obj = new target();
        Object.defineProperty(obj, Constant.CACHE, {
            value: {},
            writable: true,
            enumerable: false,
            configurable: false
        });
        for (const property in obj) {
            if (property.slice(0, PREFIX_LENGTH) === Constant.GETTER_PREFIX) {
                Object.defineProperty(obj, property.slice(PREFIX_LENGTH), {
                    ...Object.getOwnPropertyDescriptor(obj, property.slice(PREFIX_LENGTH)),
                    get() {
                        return this[Constant.CACHE][property.slice(PREFIX_LENGTH)];
                    }
                });
                obj[Constant.CACHE][property.slice(PREFIX_LENGTH)] = obj[property]();
            }
        }
        const proxy = DeepProxy(obj, {
            set(targetSet, name, val) {
                targetSet[name] = val;
                const options = targetSet[Constant.OPTION];
                Object.entries(options).forEach(([key, hooks]) => {
                    if (hooks.includes(name) && targetSet[Constant.GETTER_PREFIX + key]) {
                        targetSet[Constant.CACHE][key] = targetSet[Constant.GETTER_PREFIX + key]();
                    }
                });
                Subject.emit(target);
                return true;
            }
        });
        return proxy;
    }, options.type);
    return target;
};
//# sourceMappingURL=Service.js.map