export declare type ServiceRegisterType = 'singleton' | 'multiple' | 'keys';
declare type ServiceRegisterOptions = {
    type: ServiceRegisterType;
};
declare type ServiceFn = (options?: ServiceRegisterOptions) => ClassDecorator;
export declare const Service: ServiceFn;
export {};
