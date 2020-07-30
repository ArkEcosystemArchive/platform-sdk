import { Primitive } from "type-fest";

import { DataRepository } from "./data-repository";

export class SettingRepository {
	#storage: DataRepository;
	#allowedKeys: string[];

	public constructor(allowedKeys: string[]) {
		this.#storage = new DataRepository();
		this.#allowedKeys = allowedKeys;
	}

	public all(): object {
		return this.#storage.all();
	}

	public keys(): object {
		return this.#storage.keys();
	}

	public values(): object {
		return this.#storage.values();
	}

	public get<T>(key: string, defaultValue?: T): T | undefined {
		this.assertValidKey(key);

		return this.#storage.get(key, defaultValue);
	}

	public set(key: string, value: Primitive | object): void {
		this.assertValidKey(key);

		this.#storage.set(key, value);
	}

	public fill(entries: object): void {
		for (const [key, value] of Object.entries(entries)) {
			this.set(key, value);
		}
	}

	public has(key: string): boolean {
		this.assertValidKey(key);

		return this.#storage.has(key);
	}

	public forget(key: string): void {
		this.assertValidKey(key);

		this.#storage.forget(key);
	}

	public flush(): void {
		this.#storage.flush();
	}

	private assertValidKey(key: string): void {
		if (this.#allowedKeys.includes(key)) {
			return;
		}

		throw new Error(`The [${key}] is not a valid setting.`);
	}
}
