import { get, has, set } from "dot-prop";
import { Schema } from "joi";

/**
 *
 *
 * @export
 * @class Config
 */
export class Config {
	/**
	 *
	 *
	 * @type {Record<string, any>}
	 * @memberof Config
	 */
	readonly #config: Record<string, any>;

	/**
	 *Creates an instance of Config.
	 * @param {object} config
	 * @param {Schema} schema
	 * @memberof Config
	 */
	public constructor(config: object, schema: Schema) {
		const { error, value } = schema.validate(config);

		if (error !== undefined) {
			throw new Error(`Failed to validate the configuration: ${error.message}`);
		}

		this.#config = value;
	}

	/**
	 *
	 *
	 * @returns {Record<string, any>}
	 * @memberof Config
	 */
	public all(): Record<string, any> {
		return this.#config;
	}

	/**
	 *
	 *
	 * @template T
	 * @param {string} key
	 * @param {T} [defaultValue]
	 * @returns {T}
	 * @memberof Config
	 */
	public get<T>(key: string, defaultValue?: T): T {
		const value: T | undefined = get(this.#config, key, defaultValue);

		if (value === undefined) {
			throw new Error(`The [${key}] is an unknown configuration value.`);
		}

		return value;
	}

	/**
	 *
	 *
	 * @template T
	 * @param {string} key
	 * @param {T} [defaultValue]
	 * @returns {(T | undefined)}
	 * @memberof Config
	 */
	public getLoose<T>(key: string, defaultValue?: T): T | undefined {
		return get(this.#config, key, defaultValue);
	}

	/**
	 *
	 *
	 * @param {string} key
	 * @param {unknown} value
	 * @memberof Config
	 */
	public set(key: string, value: unknown): void {
		set(this.#config, key, value);
	}

	/**
	 *
	 *
	 * @param {string} key
	 * @returns {boolean}
	 * @memberof Config
	 */
	public has(key: string): boolean {
		return has(this.#config, key);
	}
}

/**
 *
 *
 * @export
 * @enum {number}
 */
export enum ConfigKey {
	Bech32 = "network.crypto.bech32",
	CryptoAssetId = "network.crypto.assetId",
	CryptoBlockchainId = "network.crypto.blockchainId",
	CryptoNetworkId = "network.crypto.networkId",
	CurrencyTicker = "network.currency.ticker",
	HttpClient = "httpClient",
	KnownWallets = "network.knownWallets",
	Network = "network",
	NetworkConfiguration = "networkConfiguration", // This is currently only used by ARK. This would ideally be stored in a package internal cache, not the config.
	NetworkId = "network.id",
	Slip44 = "network.crypto.slip44",
}
