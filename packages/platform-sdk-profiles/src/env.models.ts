import { Coins, Contracts } from "@arkecosystem/platform-sdk";

export type CoinList = Record<string, Coins.CoinSpec>;

export interface CoinType {
	coin: string;
	network: string;
	ticker: string;
	symbol: string;
}

export interface EnvironmentOptions {
	coins: CoinList;
	storage: string | Storage;
	httpClient: Contracts.HttpClient;
	migrations?: Record<string, any>;
}

export interface Storage {
	all(): Promise<object>;

	get<T>(key: string): Promise<T | undefined>;

	set(key: string, value: string | object): Promise<void>;

	forget(key: string): Promise<void>;

	flush(): Promise<void>;

	count(): Promise<number>;

	snapshot(): Promise<void>;

	restore(): Promise<void>;
}
