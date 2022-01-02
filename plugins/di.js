import Vue from "vue";
import {Container} from "~/Container/index";
import PluginDI from "~/Container/plugin";
import {Test} from "static/test";

export default (ctx, inject) => {
  inject('di', Container)
  Vue.use(PluginDI)

  setTimeout(() => {
    const x = Container.get(Test)
    x.age = 1010
  }, 5000)
}
