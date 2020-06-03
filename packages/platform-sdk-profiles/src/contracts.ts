import { Coins, Contracts } from "@arkecosystem/platform-sdk";

export interface EnvironmentOptions {
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

export type ContactList = Contact[];

// Container Bindings - TODO: remove I prefix
export interface IContactRepository {}
export interface IData {}
export interface IHttpClient {}
export interface IProfileRepository {}
export interface ISettings {}
export interface IWallet {}
export interface IWalletRepository {}

export const Identifiers = {
	ContactFactory: Symbol.for("ContactFactory"),
	ContactRepository: Symbol.for("ContactRepository"),
	Data: Symbol.for("Data"),
	HttpClient: Symbol.for("HttpClient"),
	Migrator: Symbol.for("Migrator"),
	ProfileFactory: Symbol.for("ProfileFactory"),
	ProfileRepository: Symbol.for("ProfileRepository"),
	Settings: Symbol.for("Settings"),
	Storage: Symbol.for("Storage"),
	WalletFactory: Symbol.for("WalletFactory"),
	WalletRepository: Symbol.for("WalletRepository"),
};

export type ProfileFactory = (id: string, name: string) => any;
export type WalletFactory = (mnemonic: string, coin: Coins.CoinSpec, network: string) => any;
