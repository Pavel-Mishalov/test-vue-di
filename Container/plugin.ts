import Vue_, { ComponentOptions } from 'vue';
import {Container} from "./index";
import Subject from "./helpers/Subject";
import {IConstructor} from "./constructor";

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue_> {
    di?: Record<string, IConstructor<any>>;
  }
}

declare module 'vue' {
  interface Vue {
    $di: typeof Container
  }
}

export default {
  install(Vue: typeof Vue_): void {
    Vue.mixin({
      beforeCreate() {
        const di = this.$options.di;

        if (!di) return

        // @ts-ignore
        this.diUnsubscribe = Subject.subscribe((name) => {
          // @ts-ignore
          if (Object.values(di).includes(name)) {
            this.$forceUpdate()
          }
        })
      },
      destroyed() {
        if ('diUnsubscribe' in this) {
          // @ts-ignore
          this.diUnsubscribe()
        }
      }
    });
  }
}
