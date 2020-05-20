export interface ProfileData {
	name: string;
}

export interface Storage {
	all(): Promise<object>;

	get<T>(key: string): Promise<T | undefined>;

	put(key: string, value: string | object): Promise<void>;

	forget(key: string): Promise<void>;

	flush(): Promise<void>;

	count(): Promise<number>;
}

export interface ProfileServiceOptions {
	storage: string;
}
