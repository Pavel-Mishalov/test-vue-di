interface IConstructor<T> {
    new (...args: any[]): T;
}
declare class Container<Items> {
    private __initializeList;
    private __cache;
    set<T extends Items>(constructor: IConstructor<T>, fn: () => T): void;
    private register;
    get<T extends Items>(resource: IConstructor<T>): T;
}
declare const _default: Container<unknown>;
export default _default;
