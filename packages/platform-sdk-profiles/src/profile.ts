import { WalletRepository } from "./wallets/wallet-repository";

export class Profile {
	readonly #id: string;
	#name: string;
	#wallets: WalletRepository;

	constructor(data: any) {
		this.#id = data.id;
		this.#name = data.name;
		this.#wallets = new WalletRepository(data.wallets);
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

	public toObject(): any {
		return {
			id: this.#id,
			name: this.#name,
			wallets: this.#wallets.all(),
		};
	}
}
