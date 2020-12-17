export class Container {
	readonly #bindings: Map<string, any> = new Map();

	public get<T>(key: string): T {
		if (this.has(key)) {
			return this.#bindings.get(key);
		}

		throw new Error(`No matching bindings found for [${key}].`);
	}

	public set(key: string, value: unknown): void {
		this.#bindings.set(key, value);
	}

	public has(key: string): boolean {
		return this.#bindings.has(key);
	}

	public forget(key: string): void {
		this.#bindings.delete(key);
	}
}

export const container = new Container();
