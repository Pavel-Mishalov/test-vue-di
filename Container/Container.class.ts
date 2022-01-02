import {IConstructor} from "./constructor";
import {ServiceRegisterType} from "./decorators/Service";

type ContainerCache<Items> = {
  singleton: Map<IConstructor<Items>, Items>,
  keys: {
    [k: string]: Map<IConstructor<Items>, Items>
  }
}

class Container<Items> {

  private __initializeList: Record<ServiceRegisterType, Map<IConstructor<Items>, () => Items>> = {
    singleton: new Map(),
    keys: new Map(),
    multiple: new Map()
  }
  private __cache: ContainerCache<Items> = {
    singleton: new Map(),
    keys: {}
  }

  set<T extends Items>(constructor: IConstructor<T>, fn: () => T, type: ServiceRegisterType) {
    if (this.__initializeList[type].has(constructor)) {
      console.warn('@di: Error, register class second times')
    }

    this.__initializeList[type].set(constructor, fn)
  }

  private register<T extends Items>(constructor: IConstructor<T>, key?: string): void {
    const isKeyNeed: boolean = !!key && key === 'keys'

    if (isKeyNeed) {
      this.registerToKeys(constructor, key as string)
    } else {
      this.registerToSingleton(constructor)
    }
  }

  get<T extends Items>(resource: IConstructor<T>, key?: string): T {
    const isKeyNeed: boolean = !!key && key === 'keys'

    if (isKeyNeed) {
      return this.getByKey(resource, key as string)
    }

    return this.getSingletonClass(resource) as T
  }

  private getByKey<T extends Items>(resource: IConstructor<T>, key: string): T {
    const isKeyNeed: boolean = !!key && key === 'keys'
    const cache = isKeyNeed ? this.__cache.keys : this.__cache.singleton

    if (!(key in this.__cache.keys) || !this.__cache.keys[key].has(resource)) {
      this.register(resource, key)
    }

    return this.__cache.keys[key].get(resource) as T
  }

  private getSingletonClass<T extends Items>(resource: IConstructor<T>): T {
    if (!this.__cache.singleton.has(resource)) {
      this.register(resource)
    }

    return this.__cache.singleton.get(resource) as T
  }

  private registerToKeys<T extends Items>(constructor: IConstructor<T>, key: string): void {
    if (!this.__initializeList.keys.has(constructor)) {
      console.warn('@di [Container.registerToKeys]: Error, get unregister class')
    }

    if (this.__initializeList.keys.has(constructor)) {
      if (!(key in this.__cache.keys)) {
        this.__cache.keys[key] = new Map()
      }

      this.__cache.keys[key].set(constructor, this.__initializeList.keys.get(constructor)!())
    }
  }

  private registerToSingleton<T extends Items>(constructor: IConstructor<T>): void {
    if (!this.__initializeList.singleton.has(constructor)) {
      console.warn('@di [Container.registerToSingleton]: Error, get unregister class')
    }

    if (this.__initializeList.singleton.has(constructor)) {
      this.__cache.singleton.set(
        constructor,
        this.__initializeList.singleton.get(constructor)!()
      )
    }
  }

  toJSON() {
    return {
      ...this,
      diClassInstance: 'Container'
    }
  }
}

export default new Container()
