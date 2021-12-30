<template>
  <div>
    <h1>{{user.user}}</h1>
    <Tutorial/>
  </div>
</template>

<script>
import Test from "static/test";
import {Container} from "~/Container";

export default {
  name: 'IndexPage',
  di: [Test],
  data: () => ({
    user: Container.get(Test),
  }),
  mounted() {
    const test = Container.get(Test)
    // console.log(di[0].testuser)
    // console.log(di[0])
    console.log(Container.get(Test).user)
    test.name = 'Other name'
    console.log(test.user)
    test.age = 10
    console.log(test.user)
    console.log(this.$di.get(Test) === test)
  }
}
</script>
