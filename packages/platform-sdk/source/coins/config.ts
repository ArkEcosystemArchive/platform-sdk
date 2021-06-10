import dot from "dot-prop";
import { Schema } from "joi";

export class ConfigRepository {
	readonly #config: Record<string, any>;

	public constructor(config: object, schema: Schema) {
		const { error, value } = schema.validate(config);

		if (error !== undefined) {
			throw new Error(`Failed to validate the configuration: ${error.message}`);
		}

		this.#config = value;
	}

	public all(): Record<string, any> {
		return this.#config;
	}

	public get<T>(key: string, defaultValue?: T): T {
		const value: T | undefined = dot.get(this.#config, key, defaultValue);

		if (value === undefined) {
			throw new Error(`The [${key}] is an unknown configuration value.`);
		}

		return value;
	}

	public getLoose<T>(key: string, defaultValue?: T): T | undefined {
		return dot.get(this.#config, key, defaultValue);
	}

	public set(key: string, value: unknown): void {
		dot.set(this.#config, key, value);
	}

	public has(key: string): boolean {
		return dot.has(this.#config, key);
	}

	public missing(key: string): boolean {
		return !this.has(key);
	}

	public forget(key: string): boolean {
		return dot.delete(this.#config, key);
	}
}

export enum ConfigKey {
	Bech32 = "network.constants.bech32",
	CurrencyTicker = "network.currency.ticker",
	CurrencyDecimals = "network.currency.decimals",
	HttpClient = "httpClient",
	KnownWallets = "network.knownWallets",
	Network = "network",
	NetworkId = "network.id",
	Slip44 = "network.constants.slip44",
}
