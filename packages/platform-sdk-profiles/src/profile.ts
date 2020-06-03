import { Contracts } from "@arkecosystem/platform-sdk";

import { Avatar } from "./avatar";
import { ContactRepository } from "./contact-repository";
import { Storage } from "./contracts";
import { Data } from "./data";
import { Settings } from "./settings";
import { Wallet } from "./wallet";
import { WalletRepository } from "./wallet-repository";

interface ProfileConstructor {
	id: string;
	name: string;
	wallets: Wallet[];
	httpClient: Contracts.HttpClient;
	storage: Storage;
}

export class Profile {
	readonly #id: string;
	#name: string;
	readonly #wallets: WalletRepository;
	readonly #contacts: ContactRepository;
	readonly #data: Data;
	readonly #settings: Settings;
	readonly #avatar: string;

	private constructor(input) {
		// Data
		this.#id = input.id;
		this.#name = input.name;
		this.#avatar = Avatar.make(this.id());

		// Stores
		this.#data = input.data;
		this.#settings = new Settings({
			namespace: `profiles.${this.#id}`,
			storage: input.storage,
			type: "profile",
		});

		// Repositories
		this.#wallets = new WalletRepository({
			data: input.data,
			httpClient: input.httpClient,
			storage: input.storage,
			wallets: input.wallets,
		});
		this.#contacts = input.contacts;
	}

	public static async make(input: ProfileConstructor): Promise<Profile> {
		const data: Data = new Data(input.storage, `profiles.${input.id}`);

		return new Profile({ ...input, contacts: await ContactRepository.make(data), data });
	}

	public id(): string {
		return this.#id;
	}

	public name(): string {
		return this.#name;
	}

	public avatar(): string {
		return this.#avatar;
	}

	public wallets(): WalletRepository {
		return this.#wallets;
	}

	public contacts(): ContactRepository {
		return this.#contacts;
	}

	public data(): Data {
		return this.#data;
	}

	public settings(): Settings {
		return this.#settings;
	}

	public async toObject(): Promise<{
		id: string;
		name: string;
		wallets: Wallet[];
		settings: object | undefined;
	}> {
		return {
			id: this.#id,
			name: this.#name,
			wallets: this.#wallets.all(),
			settings: await this.#settings.all(),
		};
	}
}
