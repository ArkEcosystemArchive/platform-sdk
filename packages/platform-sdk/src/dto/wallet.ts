import { BigNumber } from "@arkecosystem/utils";

import { KeyValuePair } from "../contracts/types";

export abstract class AbstractWalletData {
	public constructor(protected readonly data: KeyValuePair) {}

	abstract getAddress(): string;

	abstract getPublicKey(): string | undefined;

	abstract getBalance(): BigNumber;

	abstract getNonce(): BigNumber;

	public toObject(): KeyValuePair {
		return {
			address: this.getAddress(),
			publicKey: this.getPublicKey(),
			balance: this.getBalance(),
			nonce: this.getNonce(),
		};
	}

	public raw(): KeyValuePair {
		return this.data;
	}
}
