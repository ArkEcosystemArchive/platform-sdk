import { KeyValuePair } from "../contracts/types";

export abstract class AbstractDelegateData {
	public constructor(protected readonly data: KeyValuePair) {}

	abstract address(): string;

	abstract publicKey(): string;

	abstract username(): string;

	abstract rank(): number;

	public toObject(): KeyValuePair {
		return {
			address: this.address(),
			publicKey: this.publicKey(),
			username: this.username(),
			rank: this.rank(),
		};
	}

	public raw(): KeyValuePair {
		return this.data;
	}
}
