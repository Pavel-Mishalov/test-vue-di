import { Container } from "./index";
import Subject from "./helpers/Subject";
export default {
    install(Vue) {
        Vue.mixin({
            data() {
                const di = this.$options.di;
                if (!di)
                    return {};
                const data = {};
                Object.entries(di)
                    .forEach(([name, object]) => {
                    data[name] = Container.get(object);
                });
                return data;
            },
            beforeCreate() {
                const di = this.$options.di;
                if (!di)
                    return;
                // @ts-ignore
                this.diUnsubscribe = Subject.subscribe((name) => {
                    // @ts-ignore
                    if (Object.values(di).includes(name)) {
                        this.$forceUpdate();
                    }
                });
            },
            destroyed() {
                if ('diUnsubscribe' in this) {
                    // @ts-ignore
                    this.diUnsubscribe();
                }
            }
        });
    }
};
//# sourceMappingURL=plugin.js.map