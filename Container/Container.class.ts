interface IConstructor<T> {
  new(...args: any[]): T;
}

class Container<Items> {
  private __initializeList: Map<IConstructor<Items>, () => Items> = new Map()
  private __cache: Map<IConstructor<Items>, Items> = new Map()

  set<T extends Items>(constructor: IConstructor<T>, fn: () => T) {
    if (this.__initializeList.has(constructor)) {
      console.warn('@di: Error, register class second times')
    }

    this.__initializeList.set(constructor, fn)
  }

  private register<T extends Items>(constructor: IConstructor<T>): void {
    if (!this.__initializeList.has(constructor)) {
      console.warn('@di: Error, get unregister class')
    }

    if (this.__initializeList.has(constructor)) {
      this.__cache.set(
        constructor,
        this.__initializeList.get(constructor)!()
      )
    }
  }

  get<T extends Items>(resource: IConstructor<T>): T {
    if (!this.__cache.has(resource)) {
      this.register(resource)
    }

    return this.__cache.get(resource) as T
  }
}

export default new Container()
