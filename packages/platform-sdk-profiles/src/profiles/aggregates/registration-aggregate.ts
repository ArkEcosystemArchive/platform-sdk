import { Wallet } from "../../wallets/wallet";

export class RegistrationAggregate {
	// @TODO: add typehint
	readonly #profile;

	// @TODO: add typehint
	public constructor(profile) {
		this.#profile = profile;
	}

	public delegates(): Wallet[] {
		return this.#profile
			.wallets()
			.values()
			.filter((wallet: Wallet) => wallet.isDelegate());
	}
}
