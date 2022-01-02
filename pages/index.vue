<template>
  <div>
    <h1>{{user.user}}</h1>
    <Tutorial/>
  </div>
</template>

<script>
import {Test, TestOther} from "static/test";
import {Container} from "~/Container";

export default {
  name: 'IndexPage',
  di: [Test],
  data() {
    return ({
      user: Container.get(Test),
    })
  },
  mounted() {
    console.log(this.$di === Container)
    const test = Container.get(Test)
    // console.log(di[0].testuser)
    // console.log(di[0])
    console.log(Container.get(Test).user)
    test.name = 'Other name'
    console.log(test.user)
    test.age = 10
    console.log(test.user)
    // console.log(this.$di.get(Test) === this.user)

    const x = Container.get(TestOther)
    console.log(x.production, process.env)
    console.log(test === this.user)
  }
}
</script>
