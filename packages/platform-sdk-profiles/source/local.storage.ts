import localForage from "localforage";

import { Storage } from "./env.models";

export class LocalStorage implements Storage {
	readonly #storage;
	#snapshot: object | undefined;

	public constructor(driver: string) {
		this.#storage = localForage.createInstance({
			driver: {
				indexeddb: localForage.INDEXEDDB,
				websql: localForage.WEBSQL,
				localstorage: localForage.LOCALSTORAGE,
			}[driver],
		});
	}

	public async all<T = Record<string, unknown>>(): Promise<T> {
		const result: Record<string, unknown> = {};

		for (const key of await this.#storage.keys()) {
			result[key] = await this.get(key);
		}

		return result as T;
	}

	public async get<T = any>(key: string): Promise<T | undefined> {
		return this.#storage.getItem(key);
	}

	public async set(key: string, value: string | object): Promise<void> {
		await this.#storage.setItem(key, value);
	}

	public async has(key: string): Promise<boolean> {
		return (await this.#storage.keys()).includes(key);
	}

	public async forget(key: string): Promise<void> {
		await this.#storage.removeItem(key);
	}

	public async flush(): Promise<void> {
		await this.#storage.clear();
	}

	public async count(): Promise<number> {
		return this.#storage.length();
	}

	public async snapshot(): Promise<void> {
		this.#snapshot = await this.all();
	}

	public async restore(): Promise<void> {
		if (!this.#snapshot) {
			throw new Error("There is no snapshot to restore.");
		}

		await this.flush();

		for (const [key, value] of Object.entries(this.#snapshot)) {
			await this.set(key, value);
		}
	}
}
