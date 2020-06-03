import { delete as forget, get, has, set } from "dot-prop";
import { inject, injectable } from "inversify";

import { Identifiers, Storage } from "../contracts";
import { ProfileSetting, WalletSetting } from "../enums";

@injectable()
export class Settings {
	@inject(Identifiers.Storage)
	private readonly storage!: Storage;

	#namespace!: string;
	#type!: string;

	public scope(namespace: string, type: string): Settings {
		this.#namespace = `settings.${namespace}`;
		this.#type = type;

		return this;
	}

	public async all(): Promise<object | undefined> {
		return (await this.storage.get(this.#namespace)) || {};
	}

	public async get<T>(key: string, defaultValue?: T): Promise<T | undefined> {
		this.assertValidKey(key);

		return get(await this.all(), key, defaultValue);
	}

	public async set(key: string, value: string | object): Promise<void> {
		this.assertValidKey(key);

		const result: object = (await this.all()) || {};

		set(result, key, value);

		await this.storage.set(this.#namespace, result);
	}

	public async has(key: string): Promise<boolean> {
		this.assertValidKey(key);

		return has(await this.all(), key);
	}

	public async forget(key: string): Promise<void> {
		this.assertValidKey(key);

		let result: object | undefined = await this.storage.get(this.#namespace);

		if (!result) {
			result = {};
		}

		forget(result, key);

		await this.storage.set(this.#namespace, result);
	}

	public async flush(): Promise<void> {
		await this.storage.set(this.#namespace, {});
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
