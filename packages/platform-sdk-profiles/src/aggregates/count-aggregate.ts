export class CountAggregate {
	readonly #profile;

	public constructor(profile) {
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
