import { injectable } from "inversify";

import { ISettingRepository } from "../../../contracts";
import { DataRepository } from "../../../repositories/data-repository";
import { emitProfileChanged } from "../helpers";

@injectable()
export class SettingRepository implements ISettingRepository {
	#data: DataRepository;
	#allowedKeys: string[];

	/** {@inheritDoc IWalletFactory.generate} */
	public constructor(allowedKeys: string[]) {
		this.#data = new DataRepository();
		this.#allowedKeys = allowedKeys;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public all(): object {
		return this.#data.all();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public keys(): object {
		return this.#data.keys();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public get<T>(key: string, defaultValue?: T): T | undefined {
		this.assertValidKey(key);

		return this.#data.get(key, defaultValue);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public set(key: string, value: string | number | boolean | object): void {
		this.assertValidKey(key);

		this.#data.set(key, value);

		emitProfileChanged();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public fill(entries: object): void {
		for (const [key, value] of Object.entries(entries)) {
			this.set(key, value);
		}
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public has(key: string): boolean {
		this.assertValidKey(key);

		return this.#data.has(key);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public missing(key: string): boolean {
		return !this.has(key);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public forget(key: string): void {
		this.assertValidKey(key);

		this.#data.forget(key);

		emitProfileChanged();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public flush(): void {
		this.#data.flush();

		emitProfileChanged();
	}

	private assertValidKey(key: string): void {
		if (this.#allowedKeys.includes(key)) {
			return;
		}

		throw new Error(`The [${key}] is not a valid setting.`);
	}
}
