export class Container {
	readonly #bindings: Map<string, any> = new Map();

	public get<T>(key: string): T {
		if (this.has(key)) {
			return this.#bindings.get(key);
		}

		throw new Error(`No matching bindings found for [${key}].`);
	}

	public bind(key: string, value: unknown): void {
		if (this.has(key)) {
			throw new Error(`Binding with name [${key}] already exists. Call [rebind] to replace it.`);
		}

		this.#bindings.set(key, value);
	}

	public rebind(key: string, value: unknown): void {
		this.forget(key);

		this.bind(key, value);
	}

	public has(key: string): boolean {
		return this.#bindings.has(key);
	}

	public forget(key: string): void {
		if (this.has(key)) {
			this.#bindings.delete(key);

			return;
		}

		throw new Error(`No matching bindings found for [${key}].`);
	}
}

export const container = new Container();
