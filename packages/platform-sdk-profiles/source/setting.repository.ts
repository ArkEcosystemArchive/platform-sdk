import { injectable } from "inversify";

import { IProfile, ISettingRepository } from "./contracts";
import { DataRepository } from "./data.repository";

@injectable()
export class SettingRepository implements ISettingRepository {
	readonly #profile: IProfile;
	#data: DataRepository;
	#allowedKeys: string[];

	public constructor(profile: IProfile, allowedKeys: string[]) {
		this.#profile = profile;
		this.#data = new DataRepository();
		this.#allowedKeys = allowedKeys;
	}

	/** {@inheritDoc ISettingRepository.all} */
	public all(): object {
		return this.#data.all();
	}

	/** {@inheritDoc ISettingRepository.keys} */
	public keys(): object {
		return this.#data.keys();
	}

	/** {@inheritDoc ISettingRepository.get} */
	public get<T>(key: string, defaultValue?: T): T | undefined {
		/* istanbul ignore next */
		if (this.#isUnknownKey(key)) {
			/* istanbul ignore next */
			return;
		}

		return this.#data.get(key, defaultValue);
	}

	/** {@inheritDoc ISettingRepository.set} */
	public set(key: string, value: string | number | boolean | object): void {
		/* istanbul ignore next */
		if (this.#isUnknownKey(key)) {
			/* istanbul ignore next */
			return;
		}

		this.#data.set(key, value);

		this.#profile.status().markAsDirty();
	}

	/** {@inheritDoc ISettingRepository.fill} */
	public fill(entries: object): void {
		for (const [key, value] of Object.entries(entries)) {
			this.set(key, value);
		}
	}

	/** {@inheritDoc ISettingRepository.has} */
	public has(key: string): boolean {
		/* istanbul ignore next */
		if (this.#isUnknownKey(key)) {
			/* istanbul ignore next */
			return false;
		}

		return this.#data.has(key);
	}

	/** {@inheritDoc ISettingRepository.missing} */
	public missing(key: string): boolean {
		return !this.has(key);
	}

	/** {@inheritDoc ISettingRepository.forget} */
	public forget(key: string): void {
		/* istanbul ignore next */
		if (this.#isUnknownKey(key)) {
			/* istanbul ignore next */
			return;
		}

		this.#data.forget(key);

		this.#profile.status().markAsDirty();
	}

	/** {@inheritDoc ISettingRepository.flush} */
	public flush(): void {
		this.#data.flush();

		this.#profile.status().markAsDirty();
	}

	#isUnknownKey(key: string): boolean {
		/* istanbul ignore next */
		if (this.#allowedKeys.includes(key)) {
			return false;
		}

		/* istanbul ignore next */
		if (this.#data.has(key)) {
			/* istanbul ignore next */
			this.#data.forget(key);
		}

		/* istanbul ignore next */
		return true;
	}
}
