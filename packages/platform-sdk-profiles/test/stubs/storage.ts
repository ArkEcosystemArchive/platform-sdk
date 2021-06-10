import "jest-extended";

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

import { Storage } from "../../source/environment/env.models";

export class StubStorage implements Storage {
	readonly #storage;

	public constructor() {
		try {
			this.#storage = JSON.parse(readFileSync(resolve(__dirname, "env.json")).toString());
		} catch {
			this.#storage = {};
		}
	}

	public async all<T = Record<string, unknown>>(): Promise<T> {
		return this.#storage;
	}

	public async get<T = any>(key: string): Promise<T | undefined> {
		return this.#storage[key];
	}

	public async set(key: string, value: string | object): Promise<void> {
		this.#storage[key] = value;

		writeFileSync(resolve(__dirname, "env.json"), JSON.stringify(this.#storage));
	}

	public async has(key: string): Promise<boolean> {
		return Object.keys(this.#storage).includes(key);
	}

	public async forget(key: string): Promise<void> {
		//
	}

	public async flush(): Promise<void> {
		//
	}

	public async count(): Promise<number> {
		return 0;
	}

	public async snapshot(): Promise<void> {
		//
	}

	public async restore(): Promise<void> {
		//
	}
}
