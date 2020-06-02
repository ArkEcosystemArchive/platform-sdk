import { Contracts } from "@arkecosystem/platform-sdk";

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
