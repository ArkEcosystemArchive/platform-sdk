import { Coins, Contracts } from "@arkecosystem/platform-sdk";

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

// Contacts
export type ContactAddress = { coin: string; network: string; address: string };

export interface ContactStruct {
	name: string;
	addresses: ContactAddress[];
	starred: boolean;
}

export interface Contact extends ContactStruct {
	id: string;
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

// Structs
export interface WalletStruct {
	coin: string;
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
	publicKey: string;
	data: Record<string, any>;
	settings: Record<string, any>;
}

export interface ProfileStruct {
	id: string;
	name: string;
	wallets: Record<string, any>;
	contacts: Record<string, any>;
	data: Record<string, any>;
	settings: Record<string, any>;
}
