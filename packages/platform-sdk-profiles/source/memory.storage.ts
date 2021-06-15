import { Storage } from "./env.models";

export class MemoryStorage implements Storage {
	#storage: Record<string, unknown> = {};

	public constructor(data?: any) {
		this.#storage = data || {};
	}

	public async all<T = Record<string, unknown>>(): Promise<T> {
		return this.#storage as T;
	}

	public async get<T = any>(key: string): Promise<T | undefined> {
		return this.#storage[key] as T;
	}

	public async set(key: string, value: string | object): Promise<void> {
		this.#storage[key] = value;
	}

	public async has(key: string): Promise<boolean> {
		return Object.keys(this.#storage).includes(key);
	}

	public async forget(key: string): Promise<void> {
		delete this.#storage[key];
	}

	public async flush(): Promise<void> {
		this.#storage = {};
	}

	public async count(): Promise<number> {
		return Object.keys(this.#storage).length;
	}

	public async snapshot(): Promise<void> {
		//
	}

	public async restore(): Promise<void> {
		//
	}
}
