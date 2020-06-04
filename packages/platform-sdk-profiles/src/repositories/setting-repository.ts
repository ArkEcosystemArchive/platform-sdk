import { ProfileSetting, WalletSetting } from "../enums";
import { DataRepository } from "./data-repository";

export class SettingRepository {
	#storage: DataRepository;
	#type: string;
	#allowedKeys: string[];

	public constructor(type: string, allowedKeys: string[]) {
		this.#storage = new DataRepository(type, "setting");
		this.#type = type;
		this.#allowedKeys = allowedKeys;
	}

	public all(): object {
		return this.#storage.all();
	}

	public get<T>(key: string, defaultValue?: T): T | undefined {
		this.assertValidKey(key);

		return this.#storage.get(key, defaultValue);
	}

	public set(key: string, value: string | object): void {
		this.assertValidKey(key);

		this.#storage.set(key, value);
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
