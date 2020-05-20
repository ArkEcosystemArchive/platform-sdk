import { Storage } from "./contracts";
import { Settings } from "./settings";
import { Wallet } from "./wallets/wallet";
import { WalletRepository } from "./wallets/wallet-repository";

export class Profile {
	readonly #id: string;
	#name: string;
	readonly #wallets: WalletRepository;
	readonly #settings: Settings;

	public constructor(data: { id: string; name: string; wallets: Wallet[]; storage: Storage }) {
		this.#id = data.id;
		this.#name = data.name;
		this.#wallets = new WalletRepository(data.wallets);
		this.#settings = new Settings(data.storage, `profiles.${this.#id}`);
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
