import { Contracts } from "@arkecosystem/platform-sdk";

import { Storage } from "./contracts";
import { Data } from "./data";
import { Settings } from "./settings";
import { Wallet } from "./wallets/wallet";
import { WalletRepository } from "./wallets/wallet-repository";

export class Profile {
	readonly #id: string;
	#name: string;
	readonly #wallets: WalletRepository;
	readonly #data: Data;
	readonly #settings: Settings;

	public constructor(input: {
		id: string;
		name: string;
		wallets: Wallet[];
		httpClient: Contracts.HttpClient;
		storage: Storage;
	}) {
		this.#id = input.id;
		this.#name = input.name;
		this.#wallets = new WalletRepository({
			httpClient: input.httpClient,
			storage: input.storage,
			wallets: input.wallets,
		});
		this.#data = new Data(input.storage, `profiles.${this.#id}`);
		this.#settings = new Settings(input.storage, `profiles.${this.#id}`);
	}

	public id(): string {
		return this.#id;
	}

	public name(): string {
		return this.#name;
	}

	public wallets(): WalletRepository {
		return this.#wallets;
	}

	public data(): Data {
		return this.#data;
	}

	public settings(): Settings {
		return this.#settings;
	}

	public toObject(): any {
		return {
			id: this.#id,
			name: this.#name,
			wallets: this.#wallets.all(),
		};
	}
}
