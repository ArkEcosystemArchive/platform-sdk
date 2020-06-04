import dot from "dot-prop";
import Emittery from "emittery";

import { container } from "../container";
import { Identifiers } from "../contracts";
import { DataEvent } from "../enums";

export class DataRepository {
	#storage: object = {};
	#snapshot: object | undefined;

	#namespace!: string;
	#type!: string;

	public constructor(namespace: string, type: string) {
		this.#namespace = namespace;
		this.#type = type;
	}

	public all(): object {
		return this.#storage;
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

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		container
			.get<Emittery>(Identifiers.EventEmitter)
			.emit(DataEvent.Modified, { namespace: this.#namespace, type: this.#type });
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

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		container.get<Emittery>(Identifiers.EventEmitter).emit(DataEvent.Modified, {
			namespace: this.#namespace,
			type: this.#type,
		});
	}

	public flush(): void {
		this.#storage = {};

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		container
			.get<Emittery>(Identifiers.EventEmitter)
			.emit(DataEvent.Modified, { namespace: this.#namespace, type: this.#type });
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
	}

	public toJSON(): string {
		return JSON.stringify(this.#storage);
	}
}
