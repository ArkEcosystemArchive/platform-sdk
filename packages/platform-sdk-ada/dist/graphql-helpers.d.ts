import { Coins } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";
import { UnspentTransaction } from "./transaction.models";
export declare const submitTransaction: (
	config: Coins.ConfigRepository,
	httpClient: HttpClient,
	toBroadcast: string,
) => Promise<string>;
export declare const fetchTransaction: (
	id: string,
	config: Coins.ConfigRepository,
	httpClient: HttpClient,
) => Promise<object[]>;
export declare const fetchTransactions: (
	config: Coins.ConfigRepository,
	httpClient: HttpClient,
	addresses: string[],
) => Promise<object[]>;
export declare const fetchNetworkTip: (config: Coins.ConfigRepository, httpClient: HttpClient) => Promise<number>;
export declare const fetchUsedAddressesData: (
	config: Coins.ConfigRepository,
	httpClient: HttpClient,
	addresses: string[],
) => Promise<string[]>;
export declare const listUnspentTransactions: (
	config: Coins.ConfigRepository,
	httpClient: HttpClient,
	addresses: string[],
) => Promise<UnspentTransaction[]>;
export declare const fetchUtxosAggregate: (
	config: Coins.ConfigRepository,
	httpClient: HttpClient,
	addresses: string[],
) => Promise<string>;
