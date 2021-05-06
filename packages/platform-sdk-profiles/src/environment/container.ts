import { Container as Inversify } from "inversify";

type ContainerKey = string | symbol;

export class Container {
	readonly #container = new Inversify();

	public get<T>(key: ContainerKey): T {
		return this.#container.get(key);
	}

	public bind(key: ContainerKey, value: unknown): void {
		// @TODO: we should check here what type the value is and then use
		// the appropriate `.to*` method to bind it.

		this.#container.bind(key).toConstantValue(value);
	}

	public constant(key: ContainerKey, value: unknown): void {
		this.#container.bind(key).toConstantValue(value);
	}

	public singleton(key: ContainerKey, value: new (...args: any[]) => unknown): void {
		this.#container.bind(key).to(value).inSingletonScope();
	}

	public rebind(key: ContainerKey, value: unknown): void {
		// @TODO: we should check here what type the value is and then use
		// the appropriate `.to*` method to bind it.
		this.#container.rebind(key).toConstantValue(value);
	}

	public has(key: ContainerKey): boolean {
		return this.#container.isBound(key);
	}

	public missing(key: ContainerKey): boolean {
		return !this.has(key);
	}

	public unbind(key: ContainerKey): void {
		this.#container.unbind(key);
	}

	public flush(): void {
		this.#container.unbindAll();
	}
}

export const container = new Container();
