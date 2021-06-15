import dot from "dot-prop";
import { injectable } from "inversify";

import { IDataRepository } from "./contracts";

@injectable()
export class DataRepository implements IDataRepository {
	#storage: object = {};
	#snapshot: object | undefined;

	public all(): object {
		return this.#storage;
	}

	public first<T>(): T {
		return this.values()[0] as T;
	}

	public last<T>(): T {
		return this.values()[this.count() - 1] as T;
	}

	public keys(): string[] {
		return Object.keys(this.#storage);
	}

	public values<T>(): T[] {
		return Object.values(this.#storage);
	}

	public get<T>(key: string, defaultValue?: T | undefined): T | undefined {
		return dot.get(this.#storage, key, defaultValue);
	}

	public set(key: string, value: unknown): void {
		dot.set(this.#storage, key, value);
	}

	public fill(entries: object): void {
		for (const [key, value] of Object.entries(entries)) {
			this.set(key, value);
		}
	}

	public has(key: string): boolean {
		return dot.has(this.#storage, key);
	}

	public missing(key: string): boolean {
		return !this.has(key);
	}

	public forget(key: string): void {
		dot.delete(this.#storage, key);
	}

	public forgetIndex(key: string, index: number): void {
		const value: any[] | undefined = this.get(key);

		if (value !== undefined) {
			this.set(
				key,
				value.filter((_, i) => i !== index),
			);
		}
	}

	public flush(): void {
		this.#storage = {};
	}

	public count(): number {
		return this.keys().length;
	}

	public snapshot(): void {
		this.#snapshot = { ...this.all() };
	}

	public restore(): void {
		if (!this.#snapshot) {
			throw new Error("There is no snapshot to restore.");
		}

		this.flush();

		for (const [key, value] of Object.entries(this.#snapshot)) {
			this.set(key, value);
		}

		this.#snapshot = undefined;
	}

	public toJSON(): string {
		return JSON.stringify(this.#storage);
	}
}
