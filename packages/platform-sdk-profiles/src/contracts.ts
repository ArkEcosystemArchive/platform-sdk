import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { ContactAddressProps } from "./contact-address";

export interface EnvironmentOptions {
	coins: Record<string, any>;
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

// Structs
export interface ProfileStruct {
	id: string;
	name: string;
	wallets: Record<string, any>;
	contacts: Record<string, any>;
	notifications: Record<string, any>;
	data: Record<string, any>;
	settings: Record<string, any>;
}

export interface WalletStruct {
	id: string;
	coin: string | undefined;
	coinConfig: {
		network: {
			crypto: {
				slip44: number;
			};
			currency: {
				symbol: string;
				ticker: string;
			};
			explorer: string;
			hosts: string[];
			id: string;
			name: string;
		};
	};
	network: string;
	address: string;
	publicKey: string | undefined;
	data: Record<string, any>;
	settings: Record<string, any>;
}

// Contacts
export interface ContactStruct {
	id: string;
	name: string;
	addresses?: object;
	starred: boolean;
}

// Container Bindings
export const Identifiers = {
	AppData: "Data<App>",
	Coins: "Coins",
	ContactRepository: "ContactRepository",
	DataRepository: "DataRepository",
	HttpClient: "HttpClient",
	Migrator: "Migrator",
	ProfileRepository: "ProfileRepository",
	SettingRepository: "SettingRepository",
	Storage: "Storage",
	WalletRepository: "WalletRepository",
};
