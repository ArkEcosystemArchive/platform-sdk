import { IProfile } from "../../../../contracts";

export class CountAggregate implements CountAggregate {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	public contacts(): number {
		return this.#profile.contacts().count();
	}

	public notifications(): number {
		return this.#profile.notifications().count();
	}

	public wallets(): number {
		return this.#profile.wallets().count();
	}
}
