import { Contracts } from "@arkecosystem/platform-sdk";
import { inject } from "inversify";

import { Avatar } from "./avatar";
import { Identifiers, Storage } from "./contracts";
import { ContactRepository } from "./repositories/contact-repository";
import { Data } from "./repositories/data-repository";
import { Settings } from "./repositories/setting-repository";
import { WalletRepository } from "./repositories/wallet-repository";
import { Wallet } from "./wallet";

interface ProfileConstructor {
	id: string;
	name: string;
	wallets: Wallet[];
	httpClient: Contracts.HttpClient;
	storage: Storage;
}

export class Profile {
	@inject(Identifiers.WalletRepository)
	private walletRepository!: WalletRepository;

	@inject(Identifiers.ContactRepository)
	private contactRepository!: ContactRepository;

	@inject(Identifiers.Data)
	private dataRepository!: Data;

	@inject(Identifiers.Settings)
	private settingsRepository!: Settings;

	#id!: string;
	#name!: string;
	#avatar!: string;

	public async setId(id: string): Promise<Profile> {
		this.#id = id;

		this.dataRepository = this.data().scope(`profiles.${id}`);
		this.settingsRepository = this.settings().scope(`profiles.${id}`, "profile");

		// TODO: inject the data and load contactRepository
		await this.contactRepository.setData(this.data());

		return this;
	}

	public setName(name: string): Profile {
		this.#name = name;

		return this;
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
		return this.walletRepository;
	}

	public contacts(): ContactRepository {
		return this.contactRepository;
	}

	public data(): Data {
		return this.dataRepository;
	}

	public settings(): Settings {
		return this.settingsRepository;
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
			wallets: this.wallets().all(),
			settings: await this.settings().all(),
		};
	}
}
