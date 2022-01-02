import { IConstructor } from "./constructor";
import { ServiceRegisterType } from "./decorators/Service";
declare class Container<Items> {
    private __initializeList;
    private __cache;
    set<T extends Items>(constructor: IConstructor<T>, fn: () => T, type: ServiceRegisterType): void;
    private register;
    get<T extends Items>(resource: IConstructor<T>, key?: string): T;
    private getByKey;
    private getSingletonClass;
    private registerToKeys;
    private registerToSingleton;
    toJSON(): this & {
        diClassInstance: string;
    };
}
declare const _default: Container<unknown>;
export default _default;
