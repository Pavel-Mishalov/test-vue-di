interface IConstructor<T> {
    new (...args: any[]): T;
}
declare class Subject {
    private subscription;
    subscribe(callback: (name: IConstructor<unknown>) => void): () => void;
    emit(name: IConstructor<unknown>): void;
}
declare const _default: Subject;
export default _default;
