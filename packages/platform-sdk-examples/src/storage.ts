import { Storage } from "@arkecosystem/platform-sdk-profiles";
import Conf from "conf";

import { useLogger } from "./helpers";

export class ConfStorage implements Storage {
	readonly #storage: Conf = new Conf();

	public constructor() {
		useLogger().debug(this.#storage.path);
	}

	public async all<T = Record<string, unknown>>(): Promise<T> {
		return this.#storage.store as T;
	}

	public async get<T = any>(key: string): Promise<T | undefined> {
		return this.#storage.get(key) as T;
	}

	public async set(key: string, value: string | object): Promise<void> {
		this.#storage.set(key, value);
	}

	public async has(key: string): Promise<boolean> {
		return this.#storage.has(key);
	}

	public async forget(key: string): Promise<void> {
		this.#storage.delete(key);
	}

	public async flush(): Promise<void> {
		this.#storage.clear();
	}

	public async count(): Promise<number> {
		return this.#storage.size;
	}

	public async snapshot(): Promise<void> {
		//
	}

	public async restore(): Promise<void> {
		//
	}
}
