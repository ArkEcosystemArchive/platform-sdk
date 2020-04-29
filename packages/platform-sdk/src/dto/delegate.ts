import { KeyValuePair } from "../contracts/types";

export abstract class AbstractDelegateData {
	public constructor(protected readonly data: KeyValuePair) {}

	abstract getAddress(): string;

	abstract getPublicKey(): string;

	public toObject(): KeyValuePair {
		return {
			address: this.getAddress(),
			publicKey: this.getPublicKey(),
		};
	}

	public raw(): KeyValuePair {
		return this.data;
	}
}
