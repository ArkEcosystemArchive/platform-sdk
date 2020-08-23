import { ProfileContract } from "../profile.models";

export class CountAggregate {
	readonly #profile: ProfileContract;

	public constructor(profile: ProfileContract) {
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
