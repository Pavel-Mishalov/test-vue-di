export const env = (envKey) => (target, propertyKey) => {
    Object.defineProperty(target, propertyKey, {
        ...Object.getOwnPropertyDescriptor(target, propertyKey),
        get() {
            return process.env[envKey];
        }
    });
};
//# sourceMappingURL=env.js.map