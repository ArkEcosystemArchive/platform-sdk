import { get, has, set } from "dot-prop";

export class Config {
	readonly #config: Record<string, any>;

	public constructor(config: object, schema: { validateSync: Function }) {
		try {
			this.#config = schema.validateSync(config);
		} catch (error) {
			throw new Error(`Failed to validate the configuration: ${error}`);
		}
	}

	public all(): Record<string, any> {
		return this.#config;
	}

	public get<T>(key: string): T {
		const value: T | undefined = get(this.#config, key);

		if (value === undefined) {
			throw new Error(`The [${key}] is an unknown configuration value.`);
		}

		return value;
	}

	public set(key: string, value: unknown): void {
		set(this.#config, key, value);
	}

	public has(key: string): boolean {
		return has(this.#config, key);
	}
}
