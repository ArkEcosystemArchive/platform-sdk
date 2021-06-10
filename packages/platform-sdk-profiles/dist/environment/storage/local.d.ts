import { Storage } from "../env.models";
export declare class LocalStorage implements Storage {
	#private;
	constructor(driver: string);
	all<T = Record<string, unknown>>(): Promise<T>;
	get<T = any>(key: string): Promise<T | undefined>;
	set(key: string, value: string | object): Promise<void>;
	has(key: string): Promise<boolean>;
	forget(key: string): Promise<void>;
	flush(): Promise<void>;
	count(): Promise<number>;
	snapshot(): Promise<void>;
	restore(): Promise<void>;
}
