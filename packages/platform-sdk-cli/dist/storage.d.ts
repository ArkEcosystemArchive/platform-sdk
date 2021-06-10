import { Storage } from "@arkecosystem/platform-sdk-profiles";
export declare class ConfStorage implements Storage {
	#private;
	constructor();
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
