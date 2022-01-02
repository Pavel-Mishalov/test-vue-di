import {Service, getter, inject, env} from "~/Container";

@Service()
class Test {
  name = 'Pavel'
  age = 12

  @getter(['age'])
  get user() {
    return `${this.age}, ${this.name}`
  }
}

@Service()
class TestOther {
  @env('NODE_ENV')
  production
  name = 'Pavel'
  age = 12

  /**
   * @type Test
   */
  @inject(Test)
  testFirst

  @getter(['age'])
  get user() {
    return `${this.age}, ${this.name}`
  }

  getDeepName() {
    return this.testFirst.user
  }
}

export {
  Test,
  TestOther
}
