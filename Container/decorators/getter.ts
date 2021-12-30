import {Constant} from "../constant";

export const getter: (hooks: Array<string | symbol>) => MethodDecorator = (hooks) => (target, property, descriptor) => {
  const getFn = descriptor.get
  const setFn = descriptor.set

  if (!target.hasOwnProperty(Constant.OPTION)) {
    Object.defineProperty(target, Constant.OPTION, {
      value: {},
      writable: true,
      enumerable: true,
      configurable: true
    })
  }

  if (!!getFn) {
    Object.defineProperty(target, Constant.GETTER_PREFIX + property.toString(), {
      value: getFn,
      configurable: true,
      enumerable: true,
      writable: true
    })

    // @ts-ignore
    target[Constant.OPTION][property] = hooks
  }

  if (!!setFn) {
    Object.defineProperty(target, Constant.GETTER_PREFIX + property.toString(), {
      value: setFn,
      configurable: true,
      enumerable: true,
      writable: true
    })
  }
}
