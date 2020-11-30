import { Coins, Contracts } from "@arkecosystem/platform-sdk";

export type CoinList = Record<string, Coins.CoinSpec>;

export interface CoinType {
	coin: string;
	network: string;
	ticker: string;
	symbol: string;
}

export interface KnownWallet {
	type: string;
	name: string;
	address: string;
}

export interface EnvironmentOptions {
	coins: CoinList;
	storage: string | Storage;
	httpClient: Contracts.HttpClient;
	migrations?: Record<string, any>;
	knownWallets?: KnownWallet[];
}

export interface Storage {
	all(): Promise<Record<string, unknown>>;

	get<T>(key: string): Promise<T | undefined>;

	set(key: string, value: string | object): Promise<void>;

	forget(key: string): Promise<void>;

	flush(): Promise<void>;

	count(): Promise<number>;

	snapshot(): Promise<void>;

	restore(): Promise<void>;
}

export interface StorageData {
	data: Record<string, unknown>;
	profiles: Record<string, unknown>;
}
