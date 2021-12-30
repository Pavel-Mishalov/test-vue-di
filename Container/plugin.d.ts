import Vue_ from 'vue';
import { Container } from "./index";
interface IConstructor<T> {
    new (...args: any[]): T;
}
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue_> {
        di?: Record<string, IConstructor<any>>;
    }
}
declare module 'vue' {
    interface Vue {
        $di: typeof Container;
    }
}
declare const _default: {
    install(Vue: typeof Vue_): void;
};
export default _default;
