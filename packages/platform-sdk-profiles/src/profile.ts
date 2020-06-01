import { Contracts } from "@arkecosystem/platform-sdk";

import { Avatar } from "./avatar";
import { Storage } from "./contracts";
import { Data } from "./data";
import { ProfileSetting } from "./enums";
import { Settings } from "./settings";
import { Wallet } from "./wallet";
import { WalletRepository } from "./wallet-repository";

export class Profile {
	readonly #id: string;
	#name: string;
	readonly #wallets: WalletRepository;
	readonly #data: Data;
	readonly #settings: Settings;
	readonly #avatar: string;

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
		this.#settings = new Settings({ namespace: `profiles.${this.#id}`, storage: input.storage, type: "profile" });
		this.#avatar = Avatar.make(this.id());
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
