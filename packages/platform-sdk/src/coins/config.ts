import { get, has, set } from "dot-prop";
import { Schema } from "joi";

export class Config {
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
		const value: T | undefined = get(this.#config, key, defaultValue);

		if (value === undefined) {
			throw new Error(`The [${key}] is an unknown configuration value.`);
		}

		return value;
	}

	public getLoose<T>(key: string, defaultValue?: T): T | undefined {
		return get(this.#config, key, defaultValue);
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
	CryptoAssetId = "network.crypto.assetId",
	CryptoBlockchainId = "network.crypto.blockchainId",
	CryptoNetworkId = "network.crypto.networkId",
	CryptoChainId = "network.crypto.chainId",
	CurrencyTicker = "network.currency.ticker",
	HttpClient = "httpClient",
	KnownWallets = "network.knownWallets",
	Network = "network",
	NetworkConfiguration = "networkConfiguration", // This is currently only used by ARK. This would ideally be stored in a package internal cache, not the config.
	NetworkId = "network.id",
	Slip44 = "network.crypto.slip44",
}
