import { Container as Inversify } from "inversify";

export class Container {
	readonly #bindings: Inversify = new Inversify();

	public get<T>(key: string): T {
		return this.#bindings.get(key);
	}

	public set(key: string, value: unknown): void {
		// @TODO: create setter methods for specific types of bindings
		this.#bindings.bind(key).toConstantValue(value);
	}

	public has(key: string): boolean {
		try {
			this.#bindings.get(key);

			return true;
		} catch (err) {
			return false;
		}
	}

	public forget(key: string): void {
		this.#bindings.unbind(key);
	}
}

export const container = new Container();
