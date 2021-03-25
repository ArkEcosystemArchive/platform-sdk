import { DataRepository } from "./data-repository";

export interface ISettingRepository {
    all(): object;
    keys(): object;
    get(key: string, defaultValue: T): T | undefined;
    set(key: string, value: string | number | boolean | object): void;
    fill(entries: object): void;
    has(key: string): boolean;
    missing(key: string): boolean;
    forget(key: string): void;
    flush(): void;
}
