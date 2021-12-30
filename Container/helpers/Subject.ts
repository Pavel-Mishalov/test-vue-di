interface IConstructor<T> {
  new(...args: any[]): T;
}

class Subject {
  private subscription: Array<(name: IConstructor<unknown>) => void> = []

  subscribe(callback: (name: IConstructor<unknown>) => void): () => void {
    this.subscription.push(callback)

    return () => {
      const index = this.subscription.findIndex((v) => v === callback)
      this.subscription.splice(index,1)
    }
  }

  emit(name: IConstructor<unknown>) {
    this.subscription.forEach((cb) => {
      cb(name)
    })
  }
}

export default new Subject()
