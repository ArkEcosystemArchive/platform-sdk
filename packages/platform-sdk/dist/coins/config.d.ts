import { Schema } from "joi";
export declare class ConfigRepository {
	#private;
	constructor(config: object, schema: Schema);
	all(): Record<string, any>;
	get<T>(key: string, defaultValue?: T): T;
	getLoose<T>(key: string, defaultValue?: T): T | undefined;
	set(key: string, value: unknown): void;
	has(key: string): boolean;
	missing(key: string): boolean;
}
export declare enum ConfigKey {
	Bech32 = "network.constants.bech32",
	CurrencyTicker = "network.currency.ticker",
	CurrencyDecimals = "network.currency.decimals",
	HttpClient = "httpClient",
	KnownWallets = "network.knownWallets",
	Network = "network",
	NetworkId = "network.id",
	Slip44 = "network.constants.slip44",
}
