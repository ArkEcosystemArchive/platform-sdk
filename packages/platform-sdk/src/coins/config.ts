import { get, has, set } from "dot-prop";
import { Schema } from "Joi";

export class Config {
	readonly #config: Record<string, any>;

	public constructor(config: object, schema: Schema) {
		try {
			this.#config = schema.validate(config);
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

export enum ConfigKey {
	Bech32 = "network.crypto.bech32",
	CryptoNetworkId = "network.crypto.networkId",
	CurrencyTicker = "network.currency.ticker",
	HttpClient = "httpClient",
	KnownWallets = "network.knownWallets",
	Network = "network",
	NetworkConfiguration = "networkConfiguration", // This is currently only used by ARK. This would ideally be stored in a package internal cache, not the config.
	NetworkId = "network.id",
	Slip44 = "network.crypto.slip44",
}
