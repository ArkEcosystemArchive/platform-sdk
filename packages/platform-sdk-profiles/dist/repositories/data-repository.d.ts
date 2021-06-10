import { IDataRepository } from "../contracts";
export declare class DataRepository implements IDataRepository {
	#private;
	all(): object;
	first<T>(): T;
	last<T>(): T;
	keys(): string[];
	values<T>(): T[];
	get<T>(key: string, defaultValue?: T | undefined): T | undefined;
	set(key: string, value: unknown): void;
	fill(entries: object): void;
	has(key: string): boolean;
	missing(key: string): boolean;
	forget(key: string): void;
	forgetIndex(key: string, index: number): void;
	flush(): void;
	count(): number;
	snapshot(): void;
	restore(): void;
	toJSON(): string;
}
