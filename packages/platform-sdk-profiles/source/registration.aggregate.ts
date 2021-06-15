import { IProfile, IReadWriteWallet } from "./contracts";

export class RegistrationAggregate implements RegistrationAggregate {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/** {@inheritDoc RegistrationAggregate.delegates} */
	public delegates(): IReadWriteWallet[] {
		return this.#profile
			.wallets()
			.values()
			.filter((wallet: IReadWriteWallet) => wallet.hasSyncedWithNetwork() && wallet.isDelegate());
	}
}
