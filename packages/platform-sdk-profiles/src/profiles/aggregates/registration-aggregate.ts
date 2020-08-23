import { Wallet } from "../../wallets/wallet";
import { ProfileContract } from "../profile.models";

export class RegistrationAggregate {
	readonly #profile: ProfileContract;

	public constructor(profile: ProfileContract) {
		this.#profile = profile;
	}

	public delegates(): Wallet[] {
		return this.#profile
			.wallets()
			.values()
			.filter((wallet: Wallet) => wallet.isDelegate());
	}
}
