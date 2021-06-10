import { IProfile } from "../../../../contracts";

export class CountAggregate implements CountAggregate {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/** {@inheritDoc CountAggregate.contacts} */
	public contacts(): number {
		return this.#profile.contacts().count();
	}

	/** {@inheritDoc CountAggregate.notifications} */
	public notifications(): number {
		return this.#profile.notifications().count();
	}

	/** {@inheritDoc CountAggregate.wallets} */
	public wallets(): number {
		return this.#profile.wallets().count();
	}
}
