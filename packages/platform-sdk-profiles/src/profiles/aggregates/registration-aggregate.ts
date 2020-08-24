import { ReadWriteWallet } from "../../wallets/wallet.models";
import { ProfileContract } from "../profile.models";

export class RegistrationAggregate {
	readonly #profile: ProfileContract;

	public constructor(profile: ProfileContract) {
		this.#profile = profile;
	}

	public delegates(): ReadWriteWallet[] {
		return this.#profile
			.wallets()
			.values()
			.filter((wallet: ReadWriteWallet) => wallet.isDelegate());
	}
}
