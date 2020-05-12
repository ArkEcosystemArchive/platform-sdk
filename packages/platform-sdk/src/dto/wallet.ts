import { KeyValuePair } from "../contracts/types";
import { BigNumber } from "../utils";

export abstract class AbstractWalletData {
	public constructor(protected readonly data: KeyValuePair) {}

	abstract address(): string;

	abstract publicKey(): string | undefined;

	abstract balance(): BigNumber;

	abstract nonce(): BigNumber;

	public toObject(): KeyValuePair {
		return {
			address: this.address(),
			publicKey: this.publicKey(),
			balance: this.balance(),
			nonce: this.nonce(),
		};
	}

	public raw(): KeyValuePair {
		return this.data;
	}
}
