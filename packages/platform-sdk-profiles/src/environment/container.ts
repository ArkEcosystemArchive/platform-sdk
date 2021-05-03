import { Container as Inversify } from "inversify";

export class Container {
	readonly #container = new Inversify();

	public get<T>(key: string): T {
		return this.#container.get(key);
	}

	public bind(key: string, value: unknown): void {
		// @TODO: we should check here what type the value is and then use
		// the appropriate `.to*` method to bind it.

		this.#container.bind(key).toConstantValue(value);
	}

	public constant(key: string, value: unknown): void {
		this.#container.bind(key).toConstantValue(value);
	}

	public singleton(key: string, value: new (...args: any[]) => unknown): void {
		this.#container.bind(key).to(value).inSingletonScope();
	}

	public rebind(key: string, value: unknown): void {
		// @TODO: we should check here what type the value is and then use
		// the appropriate `.to*` method to bind it.
		this.#container.rebind(key).toConstantValue(value);
	}

	public has(key: string): boolean {
		return this.#container.isBound(key);
	}

	public missing(key: string): boolean {
		return !this.has(key);
	}

	public unbind(key: string): void {
		this.#container.unbind(key);
	}

	public flush(): void {
		this.#container.unbindAll();
	}
}

export const container = new Container();
