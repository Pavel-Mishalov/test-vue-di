import {Container} from "../index";

export const inject: (className: any) => PropertyDecorator =
  (className) => (target, propertyKey) => {
    Object.defineProperty(target, propertyKey, {
      ...Object.getOwnPropertyDescriptor(target, propertyKey),
      get() {
        return Container.get(className)
      }
    })
  }
