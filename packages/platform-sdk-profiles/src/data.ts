import { delete as forget, get, has, set } from "dot-prop";

import { Storage } from "./contracts";

export class Data {
	readonly #storage: Storage;
	readonly #namespace: string;

	public constructor(storage: Storage, namespace: string) {
		this.#storage = storage;
		this.#namespace = `data.${namespace}`;
	}

	public async all(): Promise<object | undefined> {
		return (await this.#storage.get(this.#namespace)) || {};
	}

	public async get<T>(key: string, defaultValue?: T): Promise<T | undefined> {
		return get(await this.all(), key, defaultValue);
	}

	public async set(key: string, value: string | object): Promise<void> {
		const result: object = (await this.all()) || {};

		set(result, key, value);

		await this.#storage.set(this.#namespace, result);
	}

	public async has(key: string): Promise<boolean> {
		return has(await this.all(), key);
	}

	public async forget(key: string): Promise<void> {
		let result: object | undefined = await this.#storage.get(this.#namespace);

		if (!result) {
			result = {};
		}

		forget(result, key);

		await this.#storage.set(this.#namespace, result);
	}

	public async flush(): Promise<void> {
		this.#storage.set(this.#namespace, {});
	}

	public async toJSON(): Promise<string> {
		return JSON.stringify(await this.all());
	}
}
