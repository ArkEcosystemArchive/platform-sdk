import { injectable } from "inversify";

import { IProfile, ISettingRepository } from "../../../contracts";
import { DataRepository } from "../../../repositories";
import { emitProfileChanged } from "../helpers";

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
		if (this.isUnknownKey(key)) {
			return;
		}

		return this.#data.get(key, defaultValue);
	}

	/** {@inheritDoc ISettingRepository.set} */
	public set(key: string, value: string | number | boolean | object): void {
		if (this.isUnknownKey(key)) {
			return;
		}

		this.#data.set(key, value);

		emitProfileChanged(this.#profile);
	}

	/** {@inheritDoc ISettingRepository.fill} */
	public fill(entries: object): void {
		for (const [key, value] of Object.entries(entries)) {
			this.set(key, value);
		}
	}

	/** {@inheritDoc ISettingRepository.has} */
	public has(key: string): boolean {
		if (this.isUnknownKey(key)) {
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
		if (this.isUnknownKey(key)) {
			return;
		}

		this.#data.forget(key);

		emitProfileChanged(this.#profile);
	}

	/** {@inheritDoc ISettingRepository.flush} */
	public flush(): void {
		this.#data.flush();

		emitProfileChanged(this.#profile);
	}

	private isUnknownKey(key: string): boolean {
		if (this.#allowedKeys.includes(key)) {
			return false;
		}

		if (this.#data.has(key)) {
			this.#data.forget(key);
		}

		return true;
	}
}
