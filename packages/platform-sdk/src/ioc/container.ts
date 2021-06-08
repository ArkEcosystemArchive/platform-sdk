/* istanbul ignore file */

import { Container as Inversify, interfaces } from "inversify";

export type ContainerKey = string | symbol;

export class Container {
	readonly #container: Inversify;

	public constructor() {
		this.#container = new Inversify({ skipBaseClassChecks: true });
	}

	public get<T>(key: ContainerKey): T {
		return this.#container.get(key);
	}

	public constant(key: ContainerKey, value: unknown): void {
		this.#bind(key).toConstantValue(value);
	}

	public singleton(key: ContainerKey, value: new (...args: any[]) => unknown): void {
		this.#bind(key).to(value).inSingletonScope();
	}

	public rebind(key: ContainerKey, value: unknown): void {
		// @TODO: we should check here what type the value is and then use
		// the appropriate `.to*` method to bind it.
		this.#container.rebind(key).toConstantValue(value);
	}

	public has(key: ContainerKey): boolean {
		return this.#container.isBound(key);
	}

	public resolve<T>(constructorFunction: interfaces.Newable<T>): T {
		return this.#container.resolve(constructorFunction);
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

	#bind(key: ContainerKey): interfaces.BindingToSyntax<unknown> {
		if (this.has(key)) {
			throw new Error(`Duplicate binding attempted for ${key.toString()}`);
		}

		return this.#container.bind(key);
	}
}
