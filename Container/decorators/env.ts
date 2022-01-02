export const env: (envKey: string) => PropertyDecorator =
  (envKey: string) => (target, propertyKey) => {
    Object.defineProperty(target, propertyKey, {
      ...Object.getOwnPropertyDescriptor(target, propertyKey),
      get() {
        return process.env[envKey] as string
      }
    })
  }
