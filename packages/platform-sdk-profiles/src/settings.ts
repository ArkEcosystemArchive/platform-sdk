import { delete as forget, get, has, set } from "dot-prop";

import { Storage } from "./contracts";
import { ProfileSetting, WalletSetting } from "./enums";

export class Settings {
	readonly #namespace: string;
	readonly #storage: Storage;
	readonly #type: string;

	public constructor({ namespace, storage, type }) {
		this.#namespace = `settings.${namespace}`;
		this.#storage = storage;
		this.#type = type;
	}

	public async all(): Promise<object | undefined> {
		return (await this.#storage.get(this.#namespace)) || {};
	}

	public async get<T>(key: string, defaultValue?: T): Promise<T | undefined> {
		this.assertValidKey(key);

		return get(await this.all(), key, defaultValue);
	}

	public async set(key: string, value: string | object): Promise<void> {
		this.assertValidKey(key);

		const result: object = (await this.all()) || {};

		set(result, key, value);

		await this.#storage.set(this.#namespace, result);
	}

	public async has(key: string): Promise<boolean> {
		this.assertValidKey(key);

		return has(await this.all(), key);
	}

	public async forget(key: string): Promise<void> {
		this.assertValidKey(key);

		let result: object | undefined = await this.#storage.get(this.#namespace);

		if (!result) {
			result = {};
		}

		forget(result, key);

		await this.#storage.set(this.#namespace, result);
	}

	public async flush(): Promise<void> {
		await this.#storage.set(this.#namespace, {});
	}

	private assertValidKey(key: string): void {
		const allowedKeys = {
			profile: Object.values(ProfileSetting),
			wallet: Object.values(WalletSetting),
		}[this.#type];

		if (allowedKeys.includes(key)) {
			return;
		}

		throw new Error(`The [${key}] is not a valid setting for the [${this.#type}] type.`);
	}
}
