import Emittery from "emittery";

import { Identifiers } from "./contracts";

class Container {
	readonly #bindings: Map<string, any> = new Map();

	public constructor() {
		this.set(Identifiers.EventEmitter, new Emittery());
	}

	public get<T>(key: string): T {
		return this.#bindings.get(key);
	}

	public set(key: string, value: unknown): void {
		this.#bindings.set(key, value);
	}

	public has(key: string): boolean {
		return this.#bindings.has(key);
	}
}

export const container = new Container();
