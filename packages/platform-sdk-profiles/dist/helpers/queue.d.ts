export declare const pqueue: <T>(promises: (() => Promise<T>)[], concurrency?: number) => Promise<any>;
export declare const pqueueSettled: <T>(promises: (() => Promise<T>)[], concurrency?: number) => Promise<any>;
