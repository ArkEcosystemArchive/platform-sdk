import localForage from "localforage";

import { Storage } from "../contracts";

export class LocalStorage implements Storage {
	readonly #storage;

	public constructor(driver: string) {
		this.#storage = localForage.createInstance({
			driver: {
				indexeddb: localForage.INDEXEDDB,
				websql: localForage.WEBSQL,
				localstorage: localForage.LOCALSTORAGE,
			}[driver],
		});
	}

	public async all(): Promise<object> {
		const result: object = {};

		for (const key of await this.#storage.keys()) {
			result[key] = await this.get(key);
		}

		return result;
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
}
