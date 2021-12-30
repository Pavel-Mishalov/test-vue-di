import {Service} from "~/Container/decorators/Service";
import {getter} from "~/Container/decorators/getter";

@Service()
class Test {
  name = 'Pavel'
  age = 12

  @getter(['age'])
  get user() {
    return `${this.age}, ${this.name}`
  }
}

export default Test
